import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

import { MongoDbConfigEnum } from '../common/enum/config.enum';

export default (configService: ConfigService) => {
  const host = configService.get(MongoDbConfigEnum.MONGODB_HOST);
  const port = configService.get(MongoDbConfigEnum.MONGODB_PORT);
  const username = configService.get(MongoDbConfigEnum.MONGODB_USERNAME);
  const password = configService.get(MongoDbConfigEnum.MONGODB_PASSWORD);
  const dbName = configService.get(MongoDbConfigEnum.MONGODB_DATABASE);
  const authSource = configService.get(MongoDbConfigEnum.MONGODB_AUTH_SOURCE);

  const uri = `mongodb://${username}:${password}@${host}:${port}/?authSource=${authSource}`;
  return {
    uri,
    retryAttempts: 2,
    dbName
  } as MongooseModuleOptions;
};
