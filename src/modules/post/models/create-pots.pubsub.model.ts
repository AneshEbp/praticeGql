import { Field, ObjectType } from '@nestjs/graphql';
import { PostType } from './post.model';

@ObjectType()
export class CreatePostPubSubModel {
  @Field()
  message: string;
}
