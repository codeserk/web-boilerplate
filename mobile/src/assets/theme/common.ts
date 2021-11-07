import { DefaultTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { RelativeSize } from '../../utils/relative'
import { Color } from './color'
import { Fonts } from './fonts'

export const CommonStyles = StyleSheet.create({
  /** Style to separate a component to the next below  */
  separationBottom: { marginBottom: 15 },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selfCenter: {
    alignSelf: 'center',
  },

  keyboard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  fill: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RelativeSize(20),
  },
  title: {
    fontFamily: Fonts.Regular,
    fontSize: RelativeSize(20),
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: RelativeSize(34),
    textTransform: 'uppercase',
    marginBottom: RelativeSize(20),
    marginTop: RelativeSize(50),
    color: Colors.primary,
  },
  subtitle: {
    fontFamily: Fonts.Regular,
    fontSize: RelativeSize(15),
    textAlign: 'center',
    paddingHorizontal: RelativeSize(34),
    marginBottom: RelativeSize(40),
    color: Colors.black,
    lineHeight: RelativeSize(20),
  },
  subtitleSmall: {
    paddingHorizontal: 64,
  },
  body: {
    margin: 15,
    alignItems: 'center',
  },
  keyboardBody: {
    margin: 15,
    alignItems: 'center',
    marginBottom: 120,
  },
})

export const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Color.white,
    card: Color.white,
    background: Color.white,
  },
}
