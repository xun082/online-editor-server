import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindUserByEmailDto {
  @IsEmail({}, { message: '无效的邮箱地址' })
  @IsNotEmpty({ message: '邮箱地址不能为空' })
  @IsString({ message: 'email 必须为字符串' })
  email: string;
}

export class createUserDto extends FindUserByEmailDto {
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须为字符串' })
  password: string;

  @IsNotEmpty({ message: '验证码不能为空' })
  @IsString({ message: '验证码必须为字符串' })
  code: string;

  @IsString()
  @IsNotEmpty({ message: '确认密码不能为空' })
  confirm_password: string;
}
