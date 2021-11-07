import { BaseError } from './base.error'

/**
 * Error to show when the app is misconfigured.
 */
export class ConfigError extends BaseError {
  /**
   * Constructor.
   * @param message
   * @param key
   */
  constructor(message: string, key: string) {
    super(message + `\nEnsure the key '${key}' is properly configured.`)
  }
}
