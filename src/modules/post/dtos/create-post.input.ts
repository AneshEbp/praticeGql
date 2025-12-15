import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
// import { UploadScalar } from '../file.scalar';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  description: string;

  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
