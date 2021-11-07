import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'

import { Color } from '../assets/theme/color'
/**
 * View to render when the app is loading
 */
export function LoadingView() {
  return <View style={styles.container} />
}

// Styles

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
})
