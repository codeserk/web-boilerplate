import { User } from '../../users/interfaces/user.interface'

/** The input of a login request. */
export interface LoginInput {
  /** The username of the user. */
  readonly username: string

  /** The password of the user. */
  readonly password: string
}

/** The output of a login request. */
export interface LoginOutput {
  /** The access token to be used for a logged in user. */
  readonly token: string

  /** Authenticated user. */
  readonly user: User
}
