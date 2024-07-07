import { ConfigService } from '@nestjs/config';

import { OSSConfigEnum } from '../common/enum/config.enum';

interface OSSConfig {
  endpoint: string;
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
  region: string;
  cname: boolean;
}

// 函数用于加载OSS配置
export default function loadOssConfig(configService: ConfigService): OSSConfig {
  const {
    OSS_ACCESS_KEY_ID: accessKeyId,
    OSS_ACCESS_KEY_SECRET: accessKeySecret,
    OSS_BUCKET: bucket,
    OSS_REGION: region,
    OSS_ENDPOINT: endpoint
  } = OSSConfigEnum;

  return {
    endpoint: configService.get(endpoint),
    accessKeyId: configService.get(accessKeyId),
    accessKeySecret: configService.get(accessKeySecret),
    bucket: configService.get(bucket),
    region: configService.get(region),
    cname: true
  };
}
