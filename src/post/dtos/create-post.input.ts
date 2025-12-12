import { Field, InputType } from '@nestjs/graphql';
// import { UploadScalar } from '../file.scalar';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
