import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

import { UserDto } from '../../users/dtos/user.dto'
import { LoginOutput } from '../interfaces/auth.types'

@Exclude()
export class LoginResponse implements LoginOutput {
  @ApiProperty({
    description: 'The access token to be used for accessing the services',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiZ2VzdGlvbkBiYWxjbGUuY29tIiwiaWF0IjoxNjA3NzI0MTQ1LCJleHAiOjE2MDc3NjczNDV9.UHBWr8v_TzqBsJ5qr0Kj3jejg74chuZzkE4A5x5FrcQ',
  })
  @Expose()
  readonly token: string

  @ApiProperty({ description: 'Authenticated user' })
  @Expose()
  readonly user: UserDto
}
