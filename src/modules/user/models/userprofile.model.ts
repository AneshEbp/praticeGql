import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/modules/auth/models/user.model';
import { PostType } from 'src/modules/post/models/post.model';

@ObjectType()
export class UserProfileModel {
  //   @Field(() => ID)
  //   _id: string;

  //   @Field()
  //   name: string;

  //   @Field()
  //   email: string;

  //   @Field({ nullable: true })
  //   address?: string;

  @Field()
  message: string;

  @Field(() => UserType)
  user: UserType;

}
