import { IsMongoId, IsString } from 'class-validator';

export class DeletePostDto {
  @IsString()
  @IsMongoId()
  postId: string;
}
