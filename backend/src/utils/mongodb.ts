import { Types } from 'mongoose'

import { BaseError } from '../errors/base.error'

/**
 * Converts a string into mongoose's ObjectId.
 * @param id
 * @returns the object ID
 * @throws BaseError if the ID is not a mongo ID
 */
export const stringToObjectId = (id: string): Types.ObjectId => {
  try {
    return new Types.ObjectId(id)
  } catch (error) {
    throw new BaseError(`The ID "${id}" is invalid`, error)
  }
}
