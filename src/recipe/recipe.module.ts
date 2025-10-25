import { Module } from '@nestjs/common'
import { RecipeService } from './recipe.service'
import { RecipeController } from './recipe.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    PrismaModule,
    AuthModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
