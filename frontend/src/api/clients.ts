import { AxiosInstance } from 'axios'

import { AuthApi, Configuration, EntriesApi } from '../client'
import { Config } from '../interfaces/config.interface'
import { generateHttpClient } from './http'

const defaultHttp = generateHttpClient()

class ClientsManager {
  protected authAPI = new AuthApi(undefined, undefined, defaultHttp)
  protected entriesAPI = new EntriesApi(undefined, undefined, defaultHttp)
  protected readonly subscribers: ((http: AxiosInstance) => void)[] = []

  /**
   * Initializes the clients using a configuration and JWT.
   * @param config
   * @param jwt
   */
  init(config: Config, jwt?: string) {
    const http = generateHttpClient(config)
    const accessToken = jwt

    this.authAPI = new AuthApi(new Configuration({ accessToken }), config?.api.baseUrl, http)
    this.entriesAPI = new EntriesApi(new Configuration({ accessToken }), config?.api.baseUrl, http)

    for (const fn of this.subscribers) {
      fn(http)
    }
  }

  subscribe(fn: (http: AxiosInstance) => void) {
    this.subscribers.push(fn)
  }

  get auth() {
    return this.authAPI
  }

  get entries() {
    return this.entriesAPI
  }
}

export const api = new ClientsManager()
