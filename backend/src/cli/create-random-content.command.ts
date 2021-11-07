import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { getModelToken } from '@nestjs/mongoose'
import * as faker from 'faker'
import * as moment from 'moment'
import * as path from 'path'

import { AppModule } from '../app.module'
import { EntryEntity, EntryModel } from '../modules/entries/entry.schema'
import { EntryParams } from '../modules/entries/interfaces/entry.interface'
import { MediaEntity, MediaModel } from '../modules/media/media.schema'
import { UserEntity, UserModel } from '../modules/users/user.schema'

const logger = new Logger('create-random-content')

/**
 * Bootstraps the application
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  try {
    const usersModel = app.get<UserModel>(getModelToken(UserEntity.name))
    const entryModel = app.get<EntryModel>(getModelToken(EntryEntity.name))
    const mediaModel = app.get<MediaModel>(getModelToken(MediaEntity.name))

    const users = await usersModel.find({})

    // Create random media
    await mediaModel.deleteMany({})
    await mediaModel.insertMany([
      { userId: faker.random.arrayElement(users)._id, path: path.resolve('../.data/uploads/abocado.jpg') },
      { userId: faker.random.arrayElement(users)._id, path: path.resolve('../.data/uploads/chicken.jpeg') },
      { userId: faker.random.arrayElement(users)._id, path: path.resolve('../.data/uploads/pizza.jpg') },
      { userId: faker.random.arrayElement(users)._id, path: path.resolve('../.data/uploads/taco.jpg') },
    ])

    const media = await mediaModel.find({})
    const date20DaysAgo = moment().subtract(20, 'days')

    await entryModel.deleteMany({})

    let date = moment()
    do {
      date = date.subtract(1, 'day')
      logger.log(`Creating content for date: "${date}"`)

      for (const user of users) {
        const quantity = faker.datatype.number({ min: 10, max: 15 })
        const entries: EntryParams[] = []
        for (let i = 0; i < quantity; i++) {
          entries.push({
            ...createRandomEntry(user._id.toString(), date.toDate()),
            image: faker.datatype.boolean() ? faker.random.arrayElement(media)._id : undefined,
          })
        }

        await entryModel.insertMany(entries)
      }
    } while (date.isSameOrAfter(date20DaysAgo))
  } catch (error) {
    logger.error(error)
  }

  await app.close()
}

bootstrap()

/**
 * Creates a random entry
 * @param userId
 * @param date
 * @returns random entry
 */
function createRandomEntry(userId: string, date: Date): EntryParams {
  return {
    userId,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(),
    date,
  }
}
