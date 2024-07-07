import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { ResponseDto } from '@/common/dto/response.dto';

export function ApiResponseWithDto(
  model: Type<any>,
  description: string = 'Operation successful',
  status: number = 200
) {
  return applyDecorators(
    ApiExtraModels(ResponseDto, model),
    ApiResponse({
      status,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) }
            }
          }
        ]
      }
    })
  );
}
