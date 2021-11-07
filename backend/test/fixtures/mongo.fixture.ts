import { Global, Module, OnApplicationShutdown } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { mongooseSchemas } from '../../src/modules/globals/mongo.module'

/** in-memory mongo server */
let mongoServer: MongoMemoryServer

/** This module uses the in-memory database or a docker container in case og GitLab. */
@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        mongoServer = await MongoMemoryServer.create()
        const uri = mongoServer.getUri()

        return {
          uri,
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
/** Mongo module that gives access to the in-memory-database */
export class GlobalTestMongoModule implements OnApplicationShutdown {
  /** @inheritDoc */
  async onApplicationShutdown(_signal?: string): Promise<void> {
    // Stop in-memory MongoDB
    if (mongoServer) {
      await mongoServer.stop()
    }
  }
}
