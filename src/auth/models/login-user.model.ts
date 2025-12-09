import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginUserModel {
  @Field()
  message: string;

  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  refreshToken?: string;
}
