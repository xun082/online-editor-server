import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../user/schema/user.schema';

import { jwtConstants } from '@/utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(payload: any) {
    const user = await this.userModel.findOne({ id: payload.sub });
    if (!user) {
      throw new HttpException(
        '未登录或该用户不存在！请前往登录/注册~',
        HttpStatus.UNAUTHORIZED
      );
    }
    // if (user.disabled)
    //   throw new HttpException(
    //     '该用户已被禁止登录！请好好反省为什么被禁止🤣👉🤡',
    //     HttpStatus.FORBIDDEN
    //   );
    return user;
  }
}

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  // Override handleRequest so it never throws an error
  handleRequest(err, user) {
    return user;
  }
}
