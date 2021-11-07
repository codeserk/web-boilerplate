import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { EntryDto } from '../../src/modules/entries/dtos/entry.dto'
import { GetEntriesRequest } from '../../src/modules/entries/dtos/get-entries.request'

/** Fixture for entry module */
export class EntriesFixture {
  /**
   * Constructor.
   * @param app
   * @param token
   */
  constructor(private readonly app: INestApplication, private readonly token: string) {}

  /**
   * Get all endpoint
   * @param params
   * @param expect
   */
  async getAll(params: GetEntriesRequest = {}, expect: HttpStatus = HttpStatus.OK): Promise<EntryDto[]> {
    const response = await request(this.app.getHttpServer())
      .get('/api/v1/entries')
      .auth(this.token, { type: 'bearer' })
      .query(params)
      .expect(expect)

    return response.body
  }
}
