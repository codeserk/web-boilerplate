import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'IS_PUBLIC_KEY'

/**
 * Marks endpoint as public
 * @returns decorator
 */
export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true)
