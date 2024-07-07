import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import { v4 as uuid } from 'uuid';

import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

import { EmailLoginDto } from './dto/login.dto';

import { RedisService } from '@/common/redis/redis.service';
import { LoginException } from '@/core/exceptions/login.exception';

@Injectable()
export class LoginService {
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  async generateCaptcha() {
    // 创建一个验证码
    const captcha = svgCaptcha.create({
      size: 6, // 验证码长度
      ignoreChars: '0o1i', // 排除 0o1i
      noise: 2, // 噪声线条数量
      color: true, // 验证码的字符有颜色，而不是黑白
      background: '#cc9966' // 背景颜色
    });

    const uniqueId = uuid();

    const result = await this.redisService.set(uniqueId, captcha.text);

    const svgData = Buffer.from(captcha.data).toString('base64');
    console.log(captcha.text);

    if (result === 'OK') {
      return {
        data: {
          key: uniqueId,
          data: svgData
        }
      };
    }
  }

  async emailLogin(data: EmailLoginDto) {
    const { email, captcha } = data;

    // 从Redis中获取验证码
    const uniqueId = await this.redisService.get(email);

    // 验证码匹配
    if (uniqueId === captcha) {
      // 查找用户
      let user = await this.userService.findUserByEmail({ email });

      // 如果用户不存在，创建新用户
      if (!user) {
        try {
          const defaultPassword = this.generateDefaultPassword();
          user = await this.userService.createUserByEmail(
            {
              email: email,
              password: defaultPassword,
              confirm_password: defaultPassword,
              code: captcha
            },
            true
          );
        } catch (error) {
          throw new LoginException('创建用户失败，请检查输入信息。');
        }
      }

      // 返回用户的登录令牌
      try {
        return this.authService.login(user._id.toString());
      } catch (error) {
        throw new LoginException('登录失败，请稍后再试。');
      }
    } else {
      throw new LoginException('验证码无效。');
    }
  }

  // 生成默认密码的方法
  private generateDefaultPassword(): string {
    return '123456789';
  }
}
