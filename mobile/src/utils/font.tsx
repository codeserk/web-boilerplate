import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactNative = require('react-native')
import { StyleSheet } from 'react-native'
import { Fonts } from 'src/assets/theme/fonts'

import { Color } from '../assets/theme/color'
import { RelativeSize } from './relative'

export const setDefaultFont = () => {
  const oldTextRender = ReactNative.Text.render
  ReactNative.Text.render = function (...args: any[]) {
    const origin = oldTextRender.call(this, ...args)
    return React.cloneElement(origin, {
      style: [styles.defaultText, origin.props.style],
    })
  }
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: Fonts.Regular,
    fontSize: RelativeSize(16),
    color: Color.black,
  },
})
