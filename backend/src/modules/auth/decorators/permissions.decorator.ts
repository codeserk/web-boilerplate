import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { UserRole } from '../../users/interfaces/user.interface'

export const ROLE_KEY = 'role'

/**
 * Decorator to indicate that a given endpoint requires a certain user role.
 * @param role
 * @returns decorator
 */
export const RequireRole = (role: UserRole): CustomDecorator => SetMetadata(ROLE_KEY, role)
