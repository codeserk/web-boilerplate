import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from '../app.module'
import { UserService } from '../modules/users/user.service'

const logger = new Logger('init')

/**
 * Bootstraps the application
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  try {
    const users = app.get(UserService)
    logger.log('Creating initial users')
    await users.createInitialUsers()
  } catch (error) {
    logger.error(error)
  }

  await app.close()
}

bootstrap()
