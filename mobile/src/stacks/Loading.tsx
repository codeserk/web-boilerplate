import { TypedNavigator } from '@react-navigation/core'
import React from 'react'

import { LoadingView } from '../views/Loading'

/**
 * Stack shown when the app is loading.
 */
export function LoadingStack(Stack: TypedNavigator<any, any, any, any, any>) {
  return (
    <>
      <Stack.Screen name="Loading" component={LoadingView} options={{ headerShown: false }} />
    </>
  )
}
