export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export interface User {
  /** User's id */
  readonly id: string

  /** User's username */
  readonly username: string

  /** User's role */
  readonly role: UserRole
}
