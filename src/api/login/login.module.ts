import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../user/schema/user.schema';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

import { LoginService } from './login.service';
import { LoginController } from './login.controller';

import { RedisModule } from '@/common/redis/redis.module';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [
    RedisModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'user' }
    ]),
    UserModule,
    AuthModule
  ]
})
export class LoginModule {}
