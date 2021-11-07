import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { User } from '../../users/interfaces/user.interface'

/** Decorator to get the user from the request. */
export const InjectUser = createParamDecorator((data: string, context: ExecutionContext): User => {
  const request = context.switchToHttp().getRequest()
  return request.user
})
