import { IsInt, Min, Max } from 'class-validator'

export class CreateRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  value: number

  @IsInt()
  recipeId: number
}
