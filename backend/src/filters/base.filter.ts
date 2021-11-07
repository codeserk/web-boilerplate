import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Request, Response } from 'express'

import { BaseError } from '../errors/base.error'

@Catch(BaseError)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * @inheritdoc
   */
  catch(exception: BaseError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.httpCode

    response.status(status).json({
      code: exception.code,
      message: exception.message,
      statusCode: status,
      path: request.url,
    })
  }
}
