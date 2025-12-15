import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUSerInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
