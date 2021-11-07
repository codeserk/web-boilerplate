import { StorageRepository } from 'frontend/interfaces/storage-repository.interface'
import { parseString } from 'frontend/utils/parser'

export class LocalStorageRepository implements StorageRepository {
  /**
   * @inheritdoc
   */
  async get(key: string): Promise<unknown> {
    return localStorage.getItem(key)
  }

  /**
   * @inheritdoc
   */
  async set<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(key, parseString(value))
  }
}
