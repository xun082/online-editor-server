import { Inject, Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { MulterFile } from '@webundsoehne/nest-fastify-file-upload';

@Injectable()
export class MinioService {
  constructor(
    @Inject('MINIO_CLIENT') private readonly minioClient: Minio.Client
  ) {}

  async getBuckets() {
    return await this.minioClient.listBuckets();
  }

  async uploadFile(bucketName: string, fileName: string, file: MulterFile) {
    await this.minioClient.putObject(bucketName, fileName, file.buffer);

    const expiry = 24 * 60 * 60;

    const presignedUrl = await this.minioClient.presignedUrl(
      'GET',
      bucketName,
      fileName,
      expiry
    );

    return {
      url: presignedUrl
    };
  }

  async presignedPutUrl(
    bucketName: string,
    fileName: string,
    expiry: number = 24 * 60 * 60
  ) {
    return await this.minioClient.presignedPutObject(
      bucketName,
      fileName,
      expiry
    );
  }

  async presignedGetUrl(
    bucketName: string,
    fileName: string,
    expiry: number = 24 * 60 * 60
  ) {
    return await this.minioClient.presignedGetObject(
      bucketName,
      fileName,
      expiry
    );
  }

  async presignedPostPolicy(
    bucketName: string,
    fileName: string,
    expiry: number = 24 * 60 * 60
  ) {
    const policy = new Minio.PostPolicy();

    policy.setBucket(bucketName);
    policy.setKey(fileName);
    policy.setExpires(new Date(new Date().getTime() + expiry * 1000));

    return await this.minioClient.presignedPostPolicy(policy);
  }
}
