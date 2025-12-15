import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AuthorType } from './author.model';

@ObjectType()
export class PostType {
  @Field(() => ID)
  _id: string;

  @Field(() => AuthorType)
  authorId: AuthorType;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  fileUrl?: string;
}
