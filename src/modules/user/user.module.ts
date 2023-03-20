import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { UserEntity, UserSchema } from './entities/user.entity';
import { UserDTO } from './dtos/user.dto';
import { CreateUserInput } from './dtos/create-user.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          { document: UserEntity, name: UserEntity.name, schema: UserSchema },
        ]),
      ],
      resolvers: [
        {
          DTOClass: UserDTO,
          EntityClass: UserEntity,
          CreateDTOClass: CreateUserInput,
        },
      ],
    }),
  ],
})
export class UserModule {}
