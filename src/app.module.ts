import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [AuthModule, RecipeModule, RatingModule, AppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
