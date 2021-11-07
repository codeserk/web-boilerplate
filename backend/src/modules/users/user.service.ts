import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { BaseError } from '../../errors/base.error'
import { stringToObjectId } from '../../utils/mongodb'
import { JwtPayload } from '../auth/strategies/jwt.strategy'
import { User, UserRole } from './interfaces/user.interface'
import { InjectUserModel, UserModel, UserObject } from './user.schema'

@Injectable()
export class UserService {
  /** The amount of rounds to hash the password. */
  private readonly PASSWORD_HASH_ROUNDS = 8

  /**
   * Constructor.
   * @param model
   */
  constructor(@InjectUserModel() private readonly model: UserModel) {}

  /**
   * Looks for a user from a jwt payload
   * @param payload
   * @returns user found
   */
  async findUserFromJwt(payload: JwtPayload): Promise<UserObject | undefined> {
    const user = await this.model.findOne({
      _id: stringToObjectId(payload.sub),
      username: payload.username,
    })

    return user?.toObject() ?? undefined
  }

  /**
   * Validates that the user and the password matches with the ones stored in the database.
   * @param username
   * @param password
   * @returns the user
   */
  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.model.findOne({ username })
    if (!user) {
      throw new UnauthorizedException()
    }

    const verified = await this.comparePasswords(password, user.password)
    if (!verified) {
      throw new UnauthorizedException()
    }

    return {
      id: user.id,
      username: user.username,
      role: user.role,
    }
  }

  /**
   * Creates initial users.
   * This method exists only to be able to demo the project. It wouldn't make sense in
   * a real project.
   */
  async createInitialUsers(): Promise<void> {
    const admin = await this.model.findOne({ username: 'admin' })
    if (admin) {
      return
    }

    const password = await this.hash('password')
    await this.model.insertMany([
      {
        username: 'admin',
        password,
        role: UserRole.Admin,
      },
      {
        username: 'user1',
        password,
        role: UserRole.User,
      },
      {
        username: 'user2',
        password,
        role: UserRole.User,
      },
    ])
  }

  /**
   * Hash the password to be stored in the database.
   * @param password
   * @returns the hashed password
   */
  async hash(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, this.PASSWORD_HASH_ROUNDS)
    } catch (error) {
      throw new BaseError(`An error happened hashing the password`, error)
    }
  }

  /**
   * Compares the received password with the hash stored in the database.
   * @param password
   * @param hash
   * @returns true if they match, false otherwise.
   */
  protected async comparePasswords(password: string, hash: string): Promise<boolean> {
    try {
      return bcrypt.compare(password, hash)
    } catch (error) {
      throw new BaseError(`An error happened comparing the hash and password`, error)
    }
  }
}
