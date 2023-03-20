import { Injectable } from '@nestjs/common';
import {
  BeforeCreateOneHook,
  CreateOneInputType,
} from '@nestjs-query/query-graphql';
import { encrypt } from '../helpers/encrypt';

interface Password {
  password: string;
}

type GqlContext = { req: { headers: Record<string, string> } };

@Injectable()
export class PasswordHook<T extends Password>
  implements BeforeCreateOneHook<T, GqlContext>
{
  async run(instance: CreateOneInputType<T>): Promise<CreateOneInputType<T>> {
    instance.input.password = await encrypt(instance.input.password);
    return instance;
  }
}
