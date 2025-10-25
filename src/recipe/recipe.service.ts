import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateRecipeDto } from './dto/create-recipe.dto'

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, dto: CreateRecipeDto) {
    return this.prisma.recipe.create({
      data: {
        ...dto,
        authorId: userId,
      },
    })
  }

  findAll() {
    return this.prisma.recipe.findMany({ include: { author: true, ratings: true } })
  }

  findMine(userId: number) {
    return this.prisma.recipe.findMany({ where: { authorId: userId } })
  }

  findOne(id: number) {
    return this.prisma.recipe.findUnique({ where: { id }, include: { ratings: true, author: true } })
  }

  update(id: number, userId: number, dto: CreateRecipeDto) {
    // Оновлюємо тільки дозволені поля
    return this.prisma.recipe.updateMany({
      where: { id, authorId: userId },
      data: {
        title: dto.title,
        description: dto.description,
        ingredients: dto.ingredients,
        instructions: dto.instructions,
      },
    });
  }


  async remove(id: number, userId: number) {
    await this.prisma.rating.deleteMany({
      where: { recipeId: id },
    });

    return this.prisma.recipe.deleteMany({
      where: { id, authorId: userId },
    });
  }
}
