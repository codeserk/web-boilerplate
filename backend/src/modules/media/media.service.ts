import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import * as sharp from 'sharp'
import { promisify } from 'util'
import { v4 as uuidv4 } from 'uuid'

import { stringToObjectId } from '../../utils/mongodb'
import { User } from '../users/interfaces/user.interface'
import { InjectMediaModel, MediaModel, MediaObject } from './media.schema'

const createFolder = promisify(fs.mkdir)

@Injectable()
export class MediaService {
  /** Save locations */
  protected readonly location = path.resolve('../.data/uploads')

  /**
   * Constructor.
   * @param model
   */
  constructor(@InjectMediaModel() private readonly model: MediaModel) {}

  /**
   * Finds one media item by its id
   * @param id
   */
  async getMedia(id: string): Promise<MediaObject | undefined> {
    return (await this.model.findById(stringToObjectId(id))) ?? undefined
  }

  /**
   * Saves an incoming file
   * @param user
   * @param buffer
   */
  async saveFile(user: User, buffer: Buffer): Promise<MediaObject> {
    // Save file to disk
    const mediaId = uuidv4()
    const filePath = path.resolve(this.location, user.id, `${mediaId}.png`)

    await createFolder(path.resolve(this.location, user.id), { recursive: true })

    await sharp(buffer).resize(320).png().toFile(filePath)

    // Save info in mongo
    return await this.model.create({
      userId: stringToObjectId(user.id),
      path: filePath,
    })
  }
}
