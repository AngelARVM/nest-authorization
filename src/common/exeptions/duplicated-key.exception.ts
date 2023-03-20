import { GqlExecutionContext, GqlExceptionFilter } from '@nestjs/graphql';
import { MongoError } from 'mongodb';
import { BaseExceptionFilter } from '@nestjs/core';
import { Catch } from '@nestjs/common';

@Catch(MongoError)
export class DuplicateKeyExceptionFilter
  extends BaseExceptionFilter
  implements GqlExceptionFilter
{
  catch(exception: MongoError, host: GqlExecutionContext) {
    if (exception.code === 11000) {
      const message = 'El username ya existe.';
      throw Error(message);
    } else {
      super.catch(exception, host);
    }
  }
}
