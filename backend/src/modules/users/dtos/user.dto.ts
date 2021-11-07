import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

import { User, UserRole } from '../interfaces/user.interface'

@Exclude()
export class UserDto implements User {
  @ApiProperty({ description: "User's id", example: '6179d0975632c1470ebd22ca' })
  @Expose()
  readonly id: string

  @ApiProperty({ description: "User's username", example: 'user1' })
  @Expose()
  readonly username: string

  @ApiProperty({ description: "User's role", enum: UserRole, example: 'admin' })
  @Expose()
  readonly role: UserRole
}
