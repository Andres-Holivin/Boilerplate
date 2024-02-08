import {
  ArgumentsHost,
  CallHandler,
  Catch,
  ExceptionFilter,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

@Catch()
export class ErrorHandler implements ExceptionFilter {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger('EXCEPTION');
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log('exception ', exception.message);
    let statusCode: number, message: string;
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message =
        exception.getResponse()['message']?.toString() ??
        exception.getResponse();
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message || 'Internal Server Error';
    }

    this.logger.error({ statusCode, message });

    response.status(statusCode).json({
      success: false,
      statusCode: statusCode,
      message: message,
    });
  }
}
@Injectable()
export class ResponseHandler implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: 'Success',
        data: data,
      })),
    );
  }
}
@Injectable()
export class RequestHandler implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const inputs = [request.query, request.body, request.params];

    for (const input of inputs) {
      for (const key in input) {
        const value = input[key];
        if (typeof value === 'string' || value instanceof String) {
          input[key] = value.trim();
        }
      }
    }
    return next.handle();
  }
}
