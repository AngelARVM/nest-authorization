import {
  InjectQueryService,
  NoOpQueryService,
  QueryService,
} from '@nestjs-query/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { encrypt } from 'src/common/helpers/encrypt';
import { CreateUserInput } from './dtos/create-user.dto';
import { UserDTO } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';

@QueryService(UserEntity)
export class UserService extends NoOpQueryService<UserEntity> {
  constructor(
    @InjectQueryService(UserEntity) service: QueryService<UserEntity>,
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {
    super();
  }

  async getUserByUsername(username: string) {
    try {
      const user = this.userModel.findOne({ username });
      if (!user) throw Error('No se encontró el usuario.');
      return user;
    } catch (error) {
      throw Error(error);
    }
  }

  async customCreateOne(input: CreateUserInput): Promise<UserDTO> {
    try {
      const userExists = await this.getUserByUsername(input.username);
      if (userExists) throw Error('El username ya está en uso.');
      input.password = await encrypt(input.password);
      const newUser = await this.userModel.create(input);
      const response = await newUser.save();
      console.log({ response });

      return response.toObject();
    } catch (error) {
      throw Error(error);
    }
  }
}
