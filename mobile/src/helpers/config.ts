import environment from 'react-native-config'

import { Config } from '../interfaces/config.interface'

export const config: Config = {
  api: {
    baseUrl: environment.API_BASE_URL,
  },
}

if (!config.api.baseUrl) {
  throw new Error(
    'Invalid configuration, "api.baseUrl" is not set. Ensure the env variable "API_BASE_URL" is set.',
  )
}
