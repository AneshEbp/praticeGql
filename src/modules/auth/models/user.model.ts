import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PostType } from 'src/modules/post/models/post.model';
import { PostTypeinUser } from 'src/modules/user/models/user-in-post.model';



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

  @Field(() => [PostTypeinUser],{ nullable: 'itemsAndList' })
  post?: PostTypeinUser[];
}
