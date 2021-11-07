import { HttpStatus } from '@nestjs/common'

import { EntryModule } from '../../../src/modules/entries/entry.module'
import { EntryService } from '../../../src/modules/entries/entry.service'
import { TestApplication } from '../../fixtures/application.fixture'

describe('/api/v1/entries', () => {
  let app: TestApplication
  let entries: EntryService

  beforeAll(async () => {
    // Create the app
    app = await TestApplication.create({ imports: [EntryModule] })
    entries = app.nestApplication.get(EntryService)
  })

  afterAll(async () => {
    await TestApplication.tearDown(app)
  })

  beforeEach(async () => {
    jest.clearAllMocks()
    await TestApplication.clearDatabase(app)
    await app.login()
  })

  afterEach(() => {
    app.logout()
  })

  describe('GET /', () => {
    it('should get 401 error if the user is not connected', async () => {
      // Arrange
      await app.logout()

      // Assert
      await app.api.entries.getAll({}, HttpStatus.UNAUTHORIZED)
    })

    it('should throw an error if the from date is invalid', async () => {
      // Assert
      await app.api.entries.getAll({ fromDate: 'invalid-date' as any }, HttpStatus.BAD_REQUEST)
    })

    it('should throw an error if the to date is invalid', async () => {
      // Assert
      await app.api.entries.getAll({ toDate: 'invalid-date' as any }, HttpStatus.BAD_REQUEST)
    })

    it('should empty list of entries if there are no entries in the database', async () => {
      // Act
      const response = await app.api.entries.getAll()

      // Assert
      expect(response).toHaveLength(0)
    })

    it('should get a list of entries', async () => {
      // Arrange
      await entries.createOne({
        date: new Date(),
        title: 'entry-1-title',
        description: 'entry-1-description',
        userId: app.loggedUser?.id,
      })

      // Act
      const response = await app.api.entries.getAll()

      // Assert
      expect(response).toHaveLength(1)
      expect(response[0]).toMatchObject({ title: 'entry-1-title' })
    })

    it('should not get entries for other users', async () => {
      // Arrange
      await entries.createOne({
        date: new Date(),
        title: 'entry-1-title',
        description: 'entry-1-description',
        userId: 'another-user',
      })

      // Act
      const response = await app.api.entries.getAll()

      // Assert
      expect(response).toHaveLength(0)
    })
  })
})
