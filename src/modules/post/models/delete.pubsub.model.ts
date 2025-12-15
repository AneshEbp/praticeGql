import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeletePubSubModel {
  @Field()
  message: string;
}
    