import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { LogsModule } from './common/logs/logs.module';
import { TasksModule } from './common/tasks/tasks.module';
import { TimeoutInterceptor } from './core/interceptor/timeout.interceptor';
import { AllExceptionFilter } from './core/filter/all-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { LoginModule } from './api/login/login.module';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';

import loadDatabaseConfig from '@/config/mongo.config';

const NODE_ENV = process.env.NODE_ENV ? 'production' : 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${NODE_ENV}`
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: loadDatabaseConfig
    }),
    LogsModule,
    TasksModule,
    LoginModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    }
  ],
  exports: [Logger]
})
export class AppModule {}
