import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostTypeinUser {
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;

  @Field()
  description: string;
}
