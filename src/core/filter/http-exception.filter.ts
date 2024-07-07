import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Counter } from 'prom-client';
import { LoggerService } from 'src/common/logs/logs.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @InjectMetric('http_exception_total')
    private readonly prometheusCounter: Counter<string>,
    private readonly logger: LoggerService
  ) {}

  async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const { url, method } = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();

    // 监控异常
    this.prometheusCounter.labels(method, url, status.toString()).inc();

    // 记录错误日志
    this.logger.error(
      {
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: url,
        status
      },
      'http错误'
    );

    // 发送异常响应
    response.status(status).send({
      retcode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: url,
      data: exception.getResponse()
    });
  }
}
