import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';

import { User, UserDocument } from './schema/user.schema';
import { FindUserByEmailDto, createUserDto } from './dto/user.dto';

import { RedisService } from '@/common/redis/redis.service';
import { ValidationException } from '@/core/exceptions/validation.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly redisService: RedisService
  ) {}

  async getUserInfo(userId: string) {
    return await this.userModel
      .findOne({ id: userId })
      .select('-password')
      .exec();
  }

  async findUserByEmail(
    data: FindUserByEmailDto
  ): Promise<(User & { _id: Types.ObjectId }) | null> {
    const { email } = data;

    const result = await this.userModel.findOne({ email }).lean().exec();

    return result as (User & { _id: Types.ObjectId }) | null;
  }

  async createUserByEmail(data: createUserDto, isLoginType?: boolean) {
    const { email, code, password, confirm_password } = data;

    // 检查密码和确认密码是否匹配
    if (password !== confirm_password) {
      throw new ValidationException('Passwords do not match');
    }

    // 加密密码
    const passwordEncryption = await argon2.hash(password);

    // 如果是登录类型，直接创建新用户
    if (isLoginType) {
      return await this.createAndSaveUser(email, passwordEncryption, 'moment');
    }

    // 检查验证码是否匹配
    const uniqueId = await this.redisService.get(email);

    if (uniqueId !== code) {
      throw new ValidationException('Verification code is incorrect');
    }

    // 查找是否已有用户
    const existingUser = await this.userModel.findOne({ email }).lean().exec();

    // 如果没有找到用户，创建新用户
    if (!existingUser) {
      await this.createAndSaveUser(email, passwordEncryption, 'moment');
    }
  }

  // 单独提取创建和保存用户的逻辑
  private async createAndSaveUser(
    email: string,
    password: string,
    username: string
  ) {
    const user = new this.userModel({
      email,
      password,
      username
    });

    await user.save();

    return user;
  }
}
