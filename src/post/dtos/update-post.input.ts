import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @Field(() => ID)
  postId: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;
}
