import { Controller, Request } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { UserService } from './user.service';

import { RequestWithUser } from '@/common/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '获取用户信息' })
  getUserInfo(@Request() req: RequestWithUser) {
    return this.userService.getUserInfo(req.user.username);
  }
}
