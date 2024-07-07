import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { getCurrentTimestamp } from '@/utils';

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop({ default: '123456789' })
  password: string;

  @Prop({ default: '1c902bf0-df6b-447f-bb9c-a257b014b1f5' })
  avatar: string;

  @Prop({ default: getCurrentTimestamp })
  createdAt: string;

  @Prop({ default: 0 })
  githubId: number; // 添加 GitHub ID 字段
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
