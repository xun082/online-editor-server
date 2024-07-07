import { Request } from '@nestjs/common';
import { User } from 'src/api/user/schema/user.schema';

export interface ResponseModel<T> {
  code: number;
  message: string;
  data: T;
}

export interface SmsCodeType {
  RequestId: string;
  Code: string;
  BizId: string;
}

export interface RequestWithUser extends Request {
  user: User;
}

export type ObjectType = Record<string, any>;
