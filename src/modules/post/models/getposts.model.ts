import { Field, ObjectType } from '@nestjs/graphql';
import { PostType } from './post.model';

@ObjectType()
export class GetPostModel {
  @Field()
  message: string;

  @Field(() => [PostType]) // <-- array of PostType
  posts: PostType[];
}
