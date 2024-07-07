// custom-decorators.ts
import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody
} from '@nestjs/swagger';

export default function ApiFileUploadDecorate(
  description: string,
  single: boolean = true
) {
  return applyDecorators(
    ApiOperation({ summary: `${single ? '单' : '多'}文件上传`, description }),
    ApiResponse({
      status: HttpStatus.OK,
      description: '文件上传成功，返回文件信息。'
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: '请求不正确，无法处理文件。'
    }),
    ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: '没有权限执行此操作。'
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: `${single ? '单个' : '多个'}文件上传`,
      required: true,
      type: 'multipart/form-data',
      schema: {
        type: 'object',
        properties: {
          [single ? 'file' : 'files']: {
            type: single ? 'string' : 'array',
            items: single ? undefined : { type: 'string', format: 'binary' },
            format: single ? 'binary' : undefined,
            description: `要上传的${single ? '文件' : '文件数组'}`
          }
        }
      }
    })
  );
}
