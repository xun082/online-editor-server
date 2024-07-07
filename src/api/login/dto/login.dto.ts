import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class EmailLoginDto {
  @ApiProperty({ description: 'email账号', example: '2042204285@qq.com' })
  @IsNotEmpty({ message: 'email 不能为空' })
  @IsString({ message: 'email 必须为字符串' })
  @IsEmail({}, { message: 'email 必须是有效的邮箱地址' })
  email: string;

  @ApiProperty({ description: '验证码', example: '123456' })
  @IsNotEmpty({ message: '验证码不能为空' })
  @IsString({ message: '验证码必须为字符串' })
  captcha: string;
}
