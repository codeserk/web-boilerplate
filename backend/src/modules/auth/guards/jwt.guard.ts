import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  /**
   * Constructor.
   * @param reflector
   */
  constructor(private readonly reflector: Reflector) {
    super()
  }

  /**
   * @inheritdoc
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Delegate
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    return super.canActivate(context)
  }
}
