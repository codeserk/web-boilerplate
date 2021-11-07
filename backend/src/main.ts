import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as config from 'config'

import { AppModule } from './app.module'
import { setupApp } from './app.setup'
import { setupSwagger } from './app.swagger'
import { ConfigError } from './errors/config.error'

const logger = new Logger('main')

/**
 * Bootstraps the application
 */
async function bootstrap(): Promise<void> {
  // Get configuration
  const port = parseInt(config.get('app.port'), 10)
  if (Number.isNaN(port)) {
    throw new ConfigError(`Invalid port: ${port}`, 'app.port')
  }

  const app = await NestFactory.create(AppModule)

  // Setup application
  setupApp(app)

  // Enable swagger
  setupSwagger(app, port)

  await app.listen(port, '0.0.0.0')
  logger.log(`Application has started on http://localhost:${port}`)
}

bootstrap()
