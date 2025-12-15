import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.model';

@ObjectType()
export class RegisterUserModel {
  @Field()
  message: string;

  @Field(() => UserType)
  user?: UserType;
}
