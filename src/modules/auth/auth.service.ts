// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../modules/user/user.service';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly userService: UsersService,
//     private readonly jwtService: JwtService,
//   ) {}

//   async validateUser(username: string, password: string): Promise<any> {
//     const user = await this.userService.findOne(Number(username));
//     if (user && bcrypt.compareSync(password, user.password)) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(user: any) {
//     const payload = { username: user.username, sub: user.userId };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }
