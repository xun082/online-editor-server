import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginService } from './login.service';
import { EmailLoginDto } from './dto/login.dto';

@Controller('login')
@ApiTags('Login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiOperation({ summary: '邮箱验证码登录' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: EmailLoginDto
  })
  @ApiBody({ description: 'User payload', type: EmailLoginDto, required: true })
  emailLogin(@Body() loginDto: EmailLoginDto) {
    return this.loginService.emailLogin(loginDto);
  }

  @Get('captcha')
  generateCaptcha() {
    return this.loginService.generateCaptcha();
  }
}
