import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import { UserObject } from '../../users/user.schema'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor.
   * @param auth
   */
  constructor(private readonly auth: AuthService) {
    super()
  }

  /** @inheritDoc */
  async validate(username: string, password: string): Promise<UserObject> {
    const user = await this.auth.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
