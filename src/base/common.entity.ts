import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { ErrorCode } from '@/utils/constant';
import { ValidateError } from '@/core/exceptions/errors/index';

export class CommonEntity extends BaseEntity {
  @ApiProperty({
    description: 'Id',
    required: true
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    description: '创建时间',
    required: true
  })
  @CreateDateColumn({
    nullable: true,
    name: 'created_at'
  })
  createdAt: Date;

  @ApiProperty({
    description: '更新时间',
    required: true
  })
  @UpdateDateColumn({
    nullable: true,
    name: 'updated_at'
  })
  updatedAt: Date;

  static from(obj: any, model: any, hasExtraInfo?: boolean) {
    hasExtraInfo && this.handleExtraInfo(obj, model);
  }

  private static handleExtraInfo(obj: any, model: any) {
    const extraInfo = obj.extraInfo;
    if (!extraInfo) {
      return;
    }
    if (typeof extraInfo === 'string') {
      try {
        JSON.parse(extraInfo);
        model.extraInfo = extraInfo;
      } catch (error) {
        throw new ValidateError(
          `传入的extraInfo不是合法的JSON数据：${extraInfo}`
        );
      }
    } else if (typeof extraInfo === 'object') {
      model.extraInfo = JSON.stringify(extraInfo);
    }
  }

  static fromEnumFiled(status, mapping, key) {
    if (typeof status !== 'undefined' && status !== null && !mapping[status]) {
      throw new ValidateError(
        `传入的字段${key}不在系统允许范围内，请联系我们`,
        ErrorCode.INVALID
      );
    }

    return status;
  }
}
