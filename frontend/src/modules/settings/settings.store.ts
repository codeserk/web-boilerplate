import { createContext, useEffect, useState } from 'react'

import { api } from '../../api/clients'
import { Config } from '../../interfaces/config.interface'
import { StorageRepository } from '../../interfaces/storage-repository.interface'
import { parseString } from '../../utils/parser'

const JWT_KEY = 'auth.jwt'

export function useSettingsStore(config: Config, storage: StorageRepository) {
  // State

  const [isInitialized, setInitialized] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [jwt, setJwt] = useState<string | undefined>()

  // Actions

  async function saveJwt(newJwt: string) {
    setLoading(true)

    try {
      setJwt(newJwt)
      api.init(config, newJwt)

      await storage.set(JWT_KEY, newJwt)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  async function removeJwt() {
    setLoading(true)

    try {
      setJwt(undefined)
      api.init(config)

      await storage.set(JWT_KEY, null)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  async function init() {
    setInitialized(false)
    setLoading(true)

    try {
      const newJwt = parseString(await storage.get(JWT_KEY))
      setJwt(newJwt)

      api.init(config, newJwt)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
    setInitialized(true)
  }

  // Effects

  useEffect(() => {
    init()
  }, [])

  return {
    config,
    jwt,
    isInitialized,
    isLoading,

    saveJwt,
    removeJwt,
  }
}

export type SettingsStore = ReturnType<typeof useSettingsStore>

export const SettingsStoreContext = createContext<SettingsStore>(null as any)
