import { Column, Entity, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { CommonEntity } from '@/base/common.entity';

@Entity({ name: 'projects' })
export class TestEntity extends CommonEntity {
  @Index()
  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @ApiProperty({
    description: '项目名称'
  })
  @Column({ name: 'project_name', type: 'varchar' })
  projectName: string;

  @ApiProperty({
    description: '项目描述',
    required: false
  })
  @Column({ name: 'project_description', type: 'varchar' })
  projectDescription: string;

  @ApiProperty({
    description: '分享链接',
    required: false
  })
  @Column({ name: 'share_url', type: 'varchar', nullable: true })
  shareUrl?: string;

  @ApiProperty({
    description: '预览链接',
    required: false
  })
  @Column({ name: 'preview_url', type: 'varchar', nullable: true })
  previewUrl?: string;

  @ApiProperty({
    description: '扩展信息',
    type: 'object',
    example: { key: 'value', anotherKey: 123 },
    required: false
  })
  @Column({ name: 'extra_info', type: 'json', nullable: true })
  extraInfo?: object;
}
