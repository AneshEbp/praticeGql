import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/auth/models/user.model';

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
