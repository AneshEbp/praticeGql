import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class updatePostDto {
  @IsMongoId()
  postId: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
