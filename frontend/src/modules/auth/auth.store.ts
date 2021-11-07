import { createContext, useEffect, useMemo, useState } from 'react'

import { api } from '../../api/clients'
import { UserDto, UserDtoRoleEnum } from '../../client'
import { SettingsStore } from '../settings/settings.store'

export function useAuthStore(settings: SettingsStore) {
  // State

  const [isInitialized, setInitialized] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [user, setUser] = useState<UserDto | null>(null)

  // Getters

  const isAuthenticated = useMemo(() => !!user && !!settings.jwt, [user, settings.jwt])
  const isAdmin = useMemo(() => user?.role === UserDtoRoleEnum.Admin, [user?.role])

  // Actions

  /**
   * Initializes the store. Tries to get the current user if three is a saved JWT.
   * If so, saves the new JWT.
   */
  async function init() {
    setLoading(true)

    if (!settings.jwt) {
      setLoading(false)
      return setInitialized(true)
    }

    await getCurrentUser()

    setLoading(false)
    setInitialized(true)
  }

  /**
   * Tries to login using some credentials
   * @param username
   * @param password
   * @returns whether the login worked
   */
  async function login(username: string, password: string): Promise<boolean> {
    let result = false
    setLoading(true)

    try {
      const response = await api.auth.login({ loginRequest: { username, password } })
      setUser(response.data.user)

      const jwt = response.data.token
      if (jwt) {
        await settings.saveJwt(jwt)
        result = true
      }
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
    return result
  }

  async function logout() {
    setLoading(true)

    settings.removeJwt()
    setUser(null)

    setLoading(false)
  }

  /**
   * Gets the current user out of thw JWT
   */
  async function getCurrentUser() {
    setLoading(true)

    try {
      const response = await api.auth.getCurrentUser()
      const user = response.data

      setUser(user)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  // Effects

  useEffect(() => {
    if (settings.isInitialized) {
      init()
    }
  }, [settings.isInitialized])

  return {
    user,
    isInitialized,
    isLoading,
    isAuthenticated,
    isAdmin,

    login,
    logout,
  }
}

export type AuthStore = ReturnType<typeof useAuthStore>

export const AuthStoreContext = createContext<AuthStore>(null as any)
