import { HttpStatus } from '@nestjs/common';

import { BaseError } from './base.error';

import { ErrorCode } from '@/utils/constant';

export class DatabaseError extends BaseError {
  constructor(
    message: string | Record<string, unknown>,
    errorCode?: number,
    cause?: Error
  ) {
    super(
      message,
      HttpStatus.BAD_REQUEST,
      errorCode ?? ErrorCode.DATABASE_ERROR,
      cause
    );
  }
}
