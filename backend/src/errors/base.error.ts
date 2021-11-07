/**
 * Base error class for all errors generated.
 * We need this class to ensure nodejs keeps the stacktrace correctly.
 */
export class BaseError extends Error {
  /** Error code. */
  readonly code: string = this.constructor.name

  /**
   * Constructor.
   * @param message Error message.
   * @param httpCode Http code
   * @param previous Previous error.
   * @param extra Extra information about the error
   */
  constructor(
    message: string,
    readonly httpCode: number = 500,
    readonly previous?: Error,
    readonly extra: Record<string, unknown> = {},
  ) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)
  }
}
