import { INestApplication } from '@nestjs/common'
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface'
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModuleBuilder } from '@nestjs/testing'

import { setupApp } from '../../src/app.setup'
import { AuthModule } from '../../src/modules/auth/auth.module'
import { LoginResponse } from '../../src/modules/auth/dtos/login.response'
import { EntryEntity } from '../../src/modules/entries/entry.schema'
import { User, UserRole } from '../../src/modules/users/interfaces/user.interface'
import { UsersModule } from '../../src/modules/users/user.module'
import { UserDocument, UserEntity, UserModel } from '../../src/modules/users/user.schema'
import { UserService } from '../../src/modules/users/user.service'
import { AuthFixture } from './auth.fixture'
import { EntriesFixture } from './entries.fixture'
import { GlobalTestMongoModule } from './mongo.fixture'

/** Parameters for creating the test application. */
export interface TestApplicationParams extends ModuleMetadata {
  /** Do not use the default imports but strictly the ones provided in the config. */
  readonly omitDefaultImports?: boolean

  /** The function to configure the module. */
  readonly configureModule?: (moduleBuilder: TestingModuleBuilder) => TestingModuleBuilder

  /** Whether to use Open API in the test application. */
  readonly useOpenApi?: boolean
}

/** The API fixture. */
export interface ApiFixture {
  readonly entries: EntriesFixture
}

/** The login operation input interface. */
export type TestLoginInput = Omit<User, 'id'> & { password: string }

/** The helper class for creating test applications. */
export class TestApplication {
  /**
   * Returns the NestJS application for the given data.
   *
   * @param params
   * @returns the NestJS application
   */
  static async create(params: TestApplicationParams = {}): Promise<TestApplication> {
    const defaultImports = [GlobalTestMongoModule, AuthModule, UsersModule]
    const imports = params.omitDefaultImports
      ? [...(params.imports || [])]
      : [...defaultImports, ...(params.imports || [])]

    let testingModuleBuilder = Test.createTestingModule({
      imports,
      controllers: params.controllers,
      providers: params.providers,
      exports: params.exports,
    })

    if (params.configureModule) {
      testingModuleBuilder = params.configureModule(testingModuleBuilder)
    }

    const module = await testingModuleBuilder.compile()
    const app: INestApplication = module.createNestApplication()
    setupApp(app)

    await app.init()

    return new TestApplication(app)
  }

  /**
   * Tear down the application
   *
   * @param app
   */
  static async tearDown(app?: TestApplication): Promise<void> {
    if (app) {
      // Ensure we don't keep any living session
      app.logout()
      // Clear the database for the next test
      await TestApplication.clearDatabase(app)
      // Tear down the app
      await app.app.close()
    }
  }

  /**
   * Clean up the database on each iteration.
   * @param app
   */
  static async clearDatabase(app: TestApplication): Promise<void> {
    try {
      // Keep the logged user if any
      app.loggedUsername
        ? await app.app.get(getModelToken(UserEntity.name)).deleteMany({ username: { $ne: app.loggedUsername } })
        : await app.app.get(getModelToken(UserEntity.name)).deleteMany()
    } catch (ignored) {
      // If the module is not present, this will fail
      console.log(ignored)
    }
    try {
      await app.app.get(getModelToken(EntryEntity.name)).deleteMany()
    } catch (ignored) {
      // If the module is not present, this will fail
    }
  }

  /** The logged in user. */
  private user?: User
  /** The token if the application has a user logged in. */
  private token?: string = 'no-token'
  /** The API. */
  private apiFixture?: ApiFixture

  /**
   * The constructor.
   *
   * @param app
   * @protected
   */
  protected constructor(private readonly app: INestApplication) {}

  /**
   * Gets the nestjs application
   */
  get nestApplication(): INestApplication {
    return this.app
  }

  /**
   * Gets the logged user's username
   */
  get loggedUser(): User | undefined {
    return this.user
  }

  /**
   * Gets the logged user's username
   */
  get loggedUsername(): string | undefined {
    return this.user?.username
  }

  /**
   * Logins
   * @param userOverrides
   */
  async login(userOverrides: Partial<TestLoginInput> = {}): Promise<LoginResponse> {
    const usersModel = this.app.get<UserModel>(getModelToken(UserEntity.name))
    const userService = this.app.get<UserService>(UserService)

    // Some defaults we need for login in afterwards
    const username = userOverrides.username || 'test'
    const password = userOverrides.password || 'test'

    // Crete a user with default data
    await usersModel.create({
      // Defaults
      role: UserRole.Admin,
      // Overrides
      ...userOverrides,

      // Fields already computed for login
      username,
      password: await userService.hash(password),
    } as UserDocument)

    const response = await this.auth.login({ username, password })

    // Remember the user
    this.user = response.user
    // Remember the token
    this.token = response.token
    // Reset the API
    this.apiFixture = undefined

    return response
  }

  /**
   * Logs out
   */
  logout(): void {
    // Forget the user
    this.user = undefined
    // Forget the token
    this.token = 'no-token'
    // Reset the API
    this.apiFixture = undefined
  }

  /**
   * Gets the auth fixture
   */
  get auth(): AuthFixture {
    return AuthFixture.for(this.app)
  }

  /**
   * API fixtures
   */
  get api(): ApiFixture {
    if (this.apiFixture) {
      return this.apiFixture
    }

    this.apiFixture = {
      entries: new EntriesFixture(this.app, this.token),
    }

    return this.apiFixture
  }
}
