import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dtos/create-user.dto';
import { UserDTO } from './dtos/user.dto';
import { UserService } from './user.service';

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserDTO)
  createOneUser(@Args('input') input: CreateUserInput): Promise<UserDTO> {
    return this.userService.customCreateOne(input);
  }
}
