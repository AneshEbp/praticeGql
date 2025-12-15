import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetPostInput {
  @Field(() => ID)
  userId: string;

  @Field({ defaultValue: 1 })
  page: number;

  @Field({ defaultValue: 10 })
  limit: number;

  @Field({defaultValue:'createdAt'})
  sortBy:string

  @Field({defaultValue:'asc'})
  sortOrder:string
}
