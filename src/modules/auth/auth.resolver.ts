import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoggedUserResponse } from './dto/logged-user-response.dto';
import { LoginUserInput } from './dto/login-user-input.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoggedUserResponse)
  loginUser(@Args('credentials') credentials: LoginUserInput) {
    return this.authService.loginUser(credentials);
  }
}
