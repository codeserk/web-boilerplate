import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User } from '../users/interfaces/user.interface'
import { UserObject } from '../users/user.schema'
import { UserService } from '../users/user.service'
import { LoginOutput } from './interfaces/auth.types'
import { JwtPayload } from './strategies/jwt.strategy'

@Injectable()
export class AuthService {
  /**
   * Constructor.
   * @param jwtService
   * @param users
   */
  constructor(private readonly jwtService: JwtService, private readonly users: UserService) {}

  /**
   * Validates that the user and the password matches with the ones stored in the database.
   *
   * @param username
   * @param password
   * @returns the user
   */
  async validateUser(username: string, password: string): Promise<UserObject> {
    return this.users.validateUser(username, password)
  }

  /**
   * Generates the access token to be returned in the login call with the user.
   * @param user
   * @returns the login output
   */
  async login(user: User): Promise<LoginOutput> {
    return {
      token: this.jwtService.sign(JwtPayload.fromUser(user)),
      user,
    }
  }
}
