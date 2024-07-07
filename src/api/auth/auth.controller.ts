import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SendVerificationCodeDto } from './dto/auto.dto';
import { AuthService } from './auth.service';

import { ResponseDto } from '@/common/dto/response.dto';
import { ApiResponseWithDto } from '@/core/decorate/api-response.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send verification code' })
  @ApiResponseWithDto(SendVerificationCodeDto, '发送验证码')
  @ApiBody({ type: SendVerificationCodeDto })
  async sendVerificationCode(
    @Body() sendVerificationCodeDto: SendVerificationCodeDto
  ): Promise<ResponseDto<SendVerificationCodeDto>> {
    return this.authService.sendVerificationCode(sendVerificationCodeDto);
  }
}
