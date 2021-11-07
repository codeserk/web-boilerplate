/**
 * Repository to get configuration from a storage.
 * This will have different implementations depending on the platform.
 */
export interface StorageRepository {
  /**
   * Gets the value with the given key.
   * @param key
   * @returns value stored. Type is unknown, the caller should check what's there.
   */
  get(key: string): Promise<unknown>

  /**
   * Sets the value for a given key
   * @param key
   * @param value
   */
  set<T>(key: string, value: T): Promise<void>
}
