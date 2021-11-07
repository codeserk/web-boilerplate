import { Controller, Get, Post, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { plainToClass } from 'class-transformer'

import { UserDto } from '../users/dtos/user.dto'
import { User } from '../users/interfaces/user.interface'
import { AuthService } from './auth.service'
import { Public } from './decorators/public.decorator'
import { InjectUser } from './decorators/user.decorator'
import { LoginRequest } from './dtos/login.request'
import { LoginResponse } from './dtos/login.response'
import { LocalGuard } from './guards/local.guard'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  /**
   * Constructor.
   * @param auth
   */
  constructor(private readonly auth: AuthService) {}

  /**
   * Endpoint to login
   * @param user
   */
  @Post('login')
  @Public()
  @UseGuards(LocalGuard)
  @ApiOperation({ operationId: 'login', summary: 'Log in the system using the user credentials' })
  @ApiBody({ type: LoginRequest })
  @ApiCreatedResponse({
    description: 'The access data if the credentials are correct',
    type: LoginResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized error if the credentials are incorrect' })
  async login(@InjectUser() user: User): Promise<LoginResponse> {
    return plainToClass(LoginResponse, await this.auth.login(user))
  }

  /**
   * Gets the current authenticated user
   * @param user
   */
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'getCurrentUser', summary: 'Gets the current user from thw JWT token' })
  @ApiResponse({ description: 'Current user', type: UserDto })
  async getCurrentUser(@InjectUser() user: User): Promise<UserDto> {
    return plainToClass(UserDto, user)
  }
}
