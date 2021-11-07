import { TestApplication } from '../../fixtures/application.fixture'

const loginMatcher = {
  // Access tokens are JWT
  token: expect.any(String),

  user: {
    id: expect.any(String),
  },
}

describe('/auth', () => {
  let app: TestApplication

  beforeAll(async () => {
    // Create the app
    app = await TestApplication.create()
  })

  afterAll(async () => {
    await TestApplication.tearDown(app)
  })

  beforeEach(() => {
    jest.clearAllMocks()
    TestApplication.clearDatabase(app)
  })

  afterEach(() => {
    app.logout()
  })

  describe('POST /login', () => {
    it('should login with a user', async () => {
      // Act
      // Creates a user and performs the login
      const response = await app.login()

      // Assert
      expect(response).toMatchSnapshot(loginMatcher)
    })
  })
})
