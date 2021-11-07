import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthStoreContext } from 'frontend/modules/auth/auth.store'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { AppTheme } from '../assets/theme/common'
import { AuthenticatedStack } from '../stacks/Authenticated'
import { GuestStack } from '../stacks/Guest'
import { LoadingStack } from '../stacks/Loading'

const Stack = createStackNavigator()

/**
 * App navigator
 */
export function Navigator() {
  const { isInitialized, isAuthenticated, logout } = useContext(AuthStoreContext)
  const { t } = useTranslation()

  let stack
  if (!isInitialized) {
    stack = LoadingStack(Stack)
  } else {
    stack = isAuthenticated ? AuthenticatedStack(Stack, t, logout) : GuestStack(Stack)
  }

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>{stack}</Stack.Navigator>
    </NavigationContainer>
  )
}
