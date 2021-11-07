import Storage from '@react-native-async-storage/async-storage'
import { StorageRepository } from 'frontend/interfaces/storage-repository.interface'
import { parseString } from 'frontend/utils/parser'

export class AsyncStorageRepository implements StorageRepository {
  /**
   * @inheritdoc
   */
  async get(key: string): Promise<unknown> {
    return (await Storage.getItem(key)) ?? undefined
  }

  /**
   * @inheritdoc
   */
  async set<T>(key: string, value: T): Promise<void> {
    await Storage.setItem(key, parseString(value) ?? '')
  }
}
