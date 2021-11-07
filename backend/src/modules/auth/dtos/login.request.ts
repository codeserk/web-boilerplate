import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

import { LoginInput } from '../interfaces/auth.types'

@Exclude()
export class LoginRequest implements LoginInput {
  @ApiProperty({ description: 'The username', example: 'admin' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  readonly username: string

  @ApiProperty({ description: 'The password', example: 'password' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  readonly password: string
}
