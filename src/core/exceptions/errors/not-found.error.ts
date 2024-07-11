import { HttpStatus } from '@nestjs/common';

import { BaseError } from './base.error';

import { ErrorCode } from '@/utils/constant';

export class NotFoundError extends BaseError {
  constructor(
    message: string | Record<string, unknown>,
    errorCode?: number,
    cause?: Error
  ) {
    super(
      message,
      HttpStatus.NOT_FOUND,
      errorCode ?? ErrorCode.NOT_FOUND,
      cause
    );
  }
}
