import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { User, UserRole } from '../../users/interfaces/user.interface'
import { ROLE_KEY } from '../decorators/permissions.decorator'

@Injectable()
export class PermissionsGuard implements CanActivate {
  /**
   * Constructor.
   * @param reflector
   */
  constructor(private readonly reflector: Reflector) {}

  /**
   * @inheritdoc
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<UserRole>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRole) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user: User = request.user

    return user.role === requiredRole
  }
}
