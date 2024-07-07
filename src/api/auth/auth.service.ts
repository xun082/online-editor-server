import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SendVerificationCodeDto } from './dto/auto.dto';

import { RedisService } from '@/common/redis/redis.service';
import { EmailService } from '@/common/email/email.service';
import { ResponseDto } from '@/common/dto/response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisService,
    private readonly emailService: EmailService,
    private jwt: JwtService
  ) {}
  private generateVerificationCode(): string {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  async sendVerificationCode(
    data: SendVerificationCodeDto
  ): Promise<ResponseDto<SendVerificationCodeDto>> {
    const { account } = data;

    const verificationCode = this.generateVerificationCode();

    await this.redisService.set(account, verificationCode, 300);

    this.emailService.sendMail(account, account, `${verificationCode}`);

    return {
      data
    };
  }

  login(account: string) {
    const access_token: string = this.jwt.sign({
      sub: account
    });

    return { access_token };
  }
}
