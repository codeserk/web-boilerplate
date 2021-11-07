import { TypedNavigator } from '@react-navigation/core'
import React from 'react'

import { LoginView } from '../views/Guest/Login'

/**
 * Stack used when the user is not authenticated. Shows ways to authenticate.
 */
export function GuestStack(Stack: TypedNavigator<any, any, any, any, any>) {
  return (
    <>
      <Stack.Screen name="SignIn" component={LoginView} options={{ headerShown: false }} />
    </>
  )
}
