import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorType {
  @Field()
  name: string;

  @Field()
  email: string;
}
