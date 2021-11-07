import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { LoginRequest } from '../../src/modules/auth/dtos/login.request'
import { LoginResponse } from '../../src/modules/auth/dtos/login.response'

/** Fixture for authentication */
export class AuthFixture {
  /**
   * Creates a new fixture the fixture from the app
   * @param app
   * @returns fixture
   */
  static for(app: INestApplication): AuthFixture {
    return new AuthFixture(app)
  }

  /**
   * Constructor
   * @param app
   */
  protected constructor(private readonly app: INestApplication) {}

  /**
   * Makes a login request
   * @param loginRequest
   * @param expect
   */
  async login(loginRequest: LoginRequest, expect: HttpStatus = HttpStatus.CREATED): Promise<LoginResponse> {
    const response = await request(this.app.getHttpServer()).post('/auth/login/').send(loginRequest).expect(expect)

    return response.body
  }
}
