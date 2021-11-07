import { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { api } from 'frontend/api/clients'

import LoginAdminMock from '../fixtures/auth-admin.json'
import LoginErrorMock from '../fixtures/auth-error.json'

/**
 * Transforms the http layer.
 * Does nothing by default, only works in e2e tests
 */
export function transformHttpLayer() {
  api.subscribe((http: AxiosInstance) => {
    const mock = new MockAdapter(http)

    // Login
    mock
      .onPost('/auth/login', {
        username: 'error',
        password: 'password',
      })
      .reply(401, LoginErrorMock)
      .onPost('/auth/login', {
        username: 'user1',
        password: 'password',
      })
      .reply(200, LoginAdminMock)
  })
}
