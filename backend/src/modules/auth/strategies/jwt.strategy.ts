import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import * as config from 'config'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { User } from '../../users/interfaces/user.interface'
import { UserObject } from '../../users/user.schema'
import { UserService } from '../../users/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor.
   * @param users
   */
  constructor(private readonly users: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('auth.jwt.secret'),
    })
  }

  /** @inheritDoc */
  async validate(payload: JwtPayload): Promise<UserObject> {
    const user = await this.users.findUserFromJwt(payload)
    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}

export class JwtPayload {
  readonly sub!: string
  readonly username!: string

  /**
   * Extracts from user
   * @param user
   * @returns payload
   */
  static fromUser(user: User): JwtPayload {
    return { sub: user.id, username: user.username }
  }
}
