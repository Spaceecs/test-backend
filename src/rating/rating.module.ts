import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}