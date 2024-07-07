import { ApiProperty } from '@nestjs/swagger';

import { getCurrentTimestamp } from '@/utils';

export class ResponseDto<T> {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  code?: number;

  @ApiProperty({
    example: 'Created',
    description: 'Message describing the result of the operation'
  })
  message?: string;

  @ApiProperty({ description: 'The data returned by the API', nullable: true })
  data?: T;

  @ApiProperty({
    example: getCurrentTimestamp(),
    description: 'Current timestamp'
  })
  timestamp?: string;
}
