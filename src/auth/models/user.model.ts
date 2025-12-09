import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  address?: string;

  @Field()
  createdAt: string;
}
