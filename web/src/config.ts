import { Config } from 'frontend/interfaces/config.interface'

export const config: Config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
}

if (!config.api.baseUrl) {
  throw new Error(
    'Invalid configuration, "api.baseUrl" is not set. Ensure the env variable "NEXT_PUBLIC_GAME_BASE_URL" is set.',
  )
}
