import { TextStyle, ViewStyle } from 'react-native'

export enum ButtonType {
  Normal = 'normal',
  Rounded = 'rounded',
  Link = 'link',
}

export interface ButtonStyle {
  container?: ViewStyle
  label?: TextStyle
  loader?: ViewStyle
  loaderColor?: string
  variants?: Record<string, ButtonStyle>
}
