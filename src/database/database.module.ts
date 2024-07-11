import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { isDev } from '@/utils/util';
import { TestEntity } from '@/entities/test.eneity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService
      ): Promise<TypeOrmModuleOptions> => ({
        type: configService.get<'mysql'>('DATABASE_CONNECTION'),
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DB_NAME'),
        entities: [__dirname + './../entities/**.entity{.ts,.js}'],
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: isDev() ? true : false,
        timezone: 'Z',
        autoLoadEntities: false,
        logger: 'advanced-console',
        logging: false
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([
      //add entity
      TestEntity
    ])
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
