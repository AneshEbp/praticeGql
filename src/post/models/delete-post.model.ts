import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeletePostModel {
  @Field()
  message: string;
}
