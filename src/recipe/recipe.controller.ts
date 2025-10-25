import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common'
import { RecipeService } from './recipe.service'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { JwtAuthGuard } from '../auth/jwt.guard'
import { User } from '../users/user.decorator'

@Controller('recipes')
@UseGuards(JwtAuthGuard)
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post()
  create(@User() user: any, @Body() dto: CreateRecipeDto) {
    return this.recipeService.create(user.userId, dto)
  }

  @Get()
  findAll() {
    return this.recipeService.findAll()
  }

  @Get('me')
  findMine(@User() user: any) {
    return this.recipeService.findMine(user.userId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(Number(id))
  }

  @Patch(':id')
  update(@User() user: any, @Param('id') id: string, @Body() dto: CreateRecipeDto) {
    return this.recipeService.update(Number(id), user.userId, dto)
  }

  @Delete(':id')
  remove(@User() user: any, @Param('id') id: string) {
    return this.recipeService.remove(Number(id), user.userId)
  }
}
