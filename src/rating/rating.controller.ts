import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { RatingService } from './rating.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { User } from '../users/user.decorator';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async rate(@User() user: any, @Body() body: CreateRatingDto) {
    const userId = user.userId;
    const { recipeId, value } = body;

    return this.ratingService.rateRecipe(userId, recipeId, value);
  }

  @Get(':recipeId')
  async getRecipeRating(@User() user: any, @Param('recipeId') recipeId: number) {
    const userId = user?.userId;
    return this.ratingService.getRecipeRating(recipeId, userId);
  }
}
