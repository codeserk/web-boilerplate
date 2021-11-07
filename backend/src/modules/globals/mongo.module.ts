import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import * as config from 'config'

import { ConfigError } from '../../errors/config.error'
import { EntryEntity, EntrySchema } from '../entries/entry.schema'
import { MediaEntity, MediaSchema } from '../media/media.schema'
import { UserEntity, UserSchema } from '../users/user.schema'

/**
 * Gets mongo connection key from the configuration
 * @returns mongo connection key
 */
function getConnectionKey(): string {
  if (!config.has('database.host')) {
    throw new ConfigError('Database host is missing', 'database.host')
  }
  if (!config.has('database.port')) {
    throw new ConfigError('Database port is missing', 'database.port')
  }

  const host = config.get('database.host')
  const port = config.get('database.port')

  return `mongodb://${host}:${port}`
}

/**
 * Module that allows the included schemas to be accessible
 * inside the module using `@InjectModel()`
 */
export const mongooseSchemas = MongooseModule.forFeature([
  { name: UserEntity.name, schema: UserSchema },
  { name: EntryEntity.name, schema: EntrySchema },
  { name: MediaEntity.name, schema: MediaSchema },
])

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        if (!config.has('database.username')) {
          throw new ConfigError('Database username is missing', 'database.user')
        }
        if (!config.has('database.password')) {
          throw new ConfigError('Database password is missing', 'database.password')
        }
        const user = config.get('database.username').toString()
        const pass = config.get('database.password').toString()

        return {
          uri: getConnectionKey(),
          user,
          pass,

          useUnifiedTopology: true,

          // This option completely ignores undefined in models and eve queries. So be sure that an undefined
          // never gets to the database in dangerous operations as deletes.
          ignoreUndefined: true,

          autoCreate: true,
          useCreateIndex: true,
          useNewUrlParser: true,
          useFindAndModify: false,
          autoIndex: true,
        }
      },
    }),
    mongooseSchemas,
  ],
  exports: [mongooseSchemas],
})
export class GlobalMongoModule {}
