import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoggedUserResponse {
  @Field(() => String, { description: 'acces_token del usuario.' })
  access_token: string;
}
