import { IsMongoId, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString({})
  title: string;

  @IsString()
  @MinLength(6)
  description: string;
}
