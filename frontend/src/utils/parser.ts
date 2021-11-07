/**
 * Gets a string from an unknown value
 * @param value
 * @returns parsed value
 */
export function parseString(value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined
  }

  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }
  const valueAny = value as any
  if (valueAny.toString && typeof valueAny.toString === 'function') {
    return valueAny.toString()
  }

  return String(value)
}

/**
 * Gets a number from an unknown value
 * @param value
 * @returns parsed value
 */
export function parseNumber(value: unknown): number | undefined {
  if (value === undefined || value === null) {
    return undefined
  }

  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string') {
    return parseInt(value, 10)
  }

  return undefined
}

/**
 * Gets a boolean from an unknown value
 * @param value
 * @returns parsed value
 */
export function parseBoolean(value: unknown): boolean | undefined {
  if (value === undefined || value === null) {
    return undefined
  }

  return value === true || value === 1 || value === '1' || value === 'true'
}

/**
 * Gets an array from an unknown value
 * @param value
 * @returns parsed value
 */
export function parseArray<T = string>(value: unknown): T[] | undefined {
  if (value === undefined || value === null) {
    return undefined
  }

  if (Array.isArray(value)) {
    return value
  }
  // In this case we can only get array of strings, but hopefully that's not
  // too bad
  if (typeof value === 'string') {
    return value.split(',') as any[]
  }

  return undefined
}

/**
 * Gets an object from an unknown value
 * @param value
 * @returns parsed value
 */
export function parseObject<T = any>(value: unknown): T | undefined {
  if (value === undefined || value === null) {
    return undefined
  }

  // There is no way to ensure that these objects are compatible with T, but
  // lets trust the caller :)
  if (typeof value === 'object') {
    return value as any as T
  }
  if (typeof value === 'string') {
    return JSON.parse(value)
  }

  return undefined
}

/**
 * Gets a value of an enum from an unknown value
 * @param value
 * @returns parsed value
 */
export function parseEnum<Enum>(enumObject: Enum, value: unknown): Enum[keyof Enum] | undefined {
  if (value === undefined || value === null) {
    return undefined
  }

  const index = Object.values(enumObject).findIndex((item) => item === value)
  if (index !== -1) {
    return enumObject[Object.keys(enumObject)[index] as keyof typeof enumObject]
  }

  return undefined
}
