import { BadRequestException, Injectable } from '@nestjs/common';

import { NoOpQueryService } from '@nestjs-query/core';
import { UserEntity } from '../user/entities/user.entity';
import { LoginUserInput } from './dto/login-user-input.dto';
import { UserDTO } from '../user/dtos/user.dto';
import { UserService } from '../user/user.service';
import { decrypt } from 'src/common/helpers/encrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtTokenService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(input: LoginUserInput): Promise<UserDTO> {
    const user = await this.userService.getUserByUsername(input.username);
    console.log({ user });

    if (await decrypt(input.password, user.password)) {
      delete user.password;
      return user;
    }

    return null;
  }

  async generateUserCredentials(user: UserDTO) {
    const payload = {
      username: user.username,
      //role: user.role,
      //permissions: user.permissions,
      sub: user._id,
    };

    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }

  async loginUser(input: LoginUserInput) {
    const user = await this.validateUser(input);
    if (!user) {
      throw new BadRequestException(
        'El usuario no existe o la contraseña no es correcta',
      );
    }
    return this.generateUserCredentials(user);
  }
}
