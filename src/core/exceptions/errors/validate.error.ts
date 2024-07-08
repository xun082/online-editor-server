import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/utils/constant';
import { BaseError } from './base.error';

export class ValidateError extends BaseError {
  constructor(message: string | Record<string, unknown>, errorCode?: number, cause?: Error) {
    super(message, HttpStatus.BAD_REQUEST, errorCode ?? ErrorCode.UNKNOWN, cause);
  }
}
