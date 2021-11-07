import { Module, Provider } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import * as config from 'config'

import { ConfigError } from '../../errors/config.error'
import { UsersModule } from '../users/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtGuard } from './guards/jwt.guard'
import { PermissionsGuard } from './guards/permissions.guard'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

export const jwtGuardProvider: Provider = {
  provide: APP_GUARD,
  useClass: JwtGuard,
}

export const permissionsGuardProvider: Provider = {
  provide: APP_GUARD,
  useClass: PermissionsGuard,
}

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        if (!config.has('auth.jwt.secret')) {
          throw new ConfigError('Invalid auth configuration, jwt secret is missing', 'auth.jwt.secret')
        }

        const jwtSecret = config.get('auth.jwt.secret').toString()

        return {
          secret: jwtSecret,
          signOptions: {
            algorithm: 'HS256',
            expiresIn: '7d',
          },
        }
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, jwtGuardProvider, permissionsGuardProvider],
})
export class AuthModule {}
