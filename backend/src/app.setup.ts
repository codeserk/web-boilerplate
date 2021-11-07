import { INestApplication, ValidationPipe } from '@nestjs/common'

import { HttpExceptionFilter } from './filters/base.filter'

/**
 * Sets up the application with the required configs.
 * There are lot of things we can include in this file, but that's probably
 * outside of the scope of this boilerplate:
 * * Improve readability of our errors, and have better control over what to do
 *   when we get any
 * * Manage CORS and other security things.
 *
 * @param app
 * @returns the app for chaining
 */
export function setupApp(app: INestApplication): INestApplication {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  app.enableCors()
  app.useGlobalFilters(new HttpExceptionFilter())

  return app
}
