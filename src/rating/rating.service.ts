import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async rateRecipe(userId: number, recipeId: number, value: number) {
    const existing = await this.prisma.rating.findFirst({
      where: { userId, recipeId },
    });

    if (existing) {
      await this.prisma.rating.update({
        where: { id: existing.id },
        data: { value },
      });
    } else {
      await this.prisma.rating.create({
        data: { userId, recipeId, value },
      });
    }

    return this.getRecipeRating(recipeId, userId);
  }

  async getRecipeRating(recipeId: number | string, userId?: number) {
    const id = typeof recipeId === 'string' ? parseInt(recipeId, 10) : recipeId;

    const ratings = await this.prisma.rating.findMany({
      where: { recipeId: id },
    });

    if (!ratings.length) return { avg: 0, count: 0, userRating: 0 };

    const avg = ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length;

    const userRating = userId
      ? ratings.find(r => r.userId === userId)?.value || 0
      : 0;

    console.log("userRating = " + userRating);

    return { avg, count: ratings.length, userRating };
  }

}
