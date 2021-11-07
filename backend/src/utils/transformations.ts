/**
 * Transforms any value into a boolean.
 * @param value
 * @returns boolean value
 */
export function toBoolean(value: unknown): boolean {
  return value === true || value === 1 || value === '1' || value === 'true'
}
