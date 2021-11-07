import { INestApplication, Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as config from 'config'

import { toBoolean } from './utils/transformations'

const logger = new Logger('bootstrap.swagger')

/**
 * Configure Swagger and expose the Open API.
 * @param app
 * @param port
 * @returns the app for chaining
 */
export function setupSwagger(app: INestApplication, port: number): INestApplication {
  const shouldUseDocs = toBoolean(config.get('app.docs'))
  const host = config.get('app.host')

  if (shouldUseDocs) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle("codeserk's web boilerplate")
      .setDescription('API docs for the boilerplate')
      .setVersion('1.0')
      .addTag('codeserk', 'rest')
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('docs', app, document)

    logger.log(`Check swagger documentation here: ${host}:${port}/docs/`)
  }

  return app
}
