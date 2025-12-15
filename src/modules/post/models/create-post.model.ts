import { Field, ObjectType } from '@nestjs/graphql';
import { PostType } from './post.model';

@ObjectType()
export class CreatePostModel {
  @Field()
  message: string;

  @Field(() => PostType)
  post: PostType;
}
