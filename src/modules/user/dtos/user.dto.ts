import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserDTO {
  @IDField(() => ID, { name: 'id' })
  _id!: string;

  @FilterableField()
  username: string;

  @FilterableField()
  created!: Date;

  @Field()
  updated!: Date;
}
