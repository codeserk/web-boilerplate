import { TypedNavigator } from '@react-navigation/core'
import { TFunction } from 'i18next'
import React from 'react'
import { StyleSheet } from 'react-native'

import { Fonts } from '../assets/theme/fonts'
import { RoundedButton } from '../components/Button'
import { RelativeSize } from '../utils/relative'
import { EntriesView } from '../views/Authenticated/Entries'

/**
 * Stack shown when the user is authenticated.
 */
export function AuthenticatedStack(
  Stack: TypedNavigator<any, any, any, any, any>,
  t: TFunction,
  logout: () => void,
) {
  return (
    <>
      <Stack.Screen
        name="Entries"
        component={EntriesView}
        options={{
          ...headerStyle,
          headerShown: true,
          title: t('diary.title'),
          headerRight: () => (
            <RoundedButton style={styles.logoutButton} label="Logout" onPress={logout} />
          ),
        }}
      />
    </>
  )
}

// Styles

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: RelativeSize(12),
  },
})

const headerStyle: any = {
  headerStyle: {
    shadowColor: 'transparent',
  },
  headerTitleStyle: {
    alignSelf: 'center',
    marginRight: -60,
    fontFamily: Fonts.Bold,
    fontSize: RelativeSize(15),
    textTransform: 'uppercase',
  },
}
