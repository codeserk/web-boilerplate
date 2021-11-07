import React from 'react'
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native'
import { StyleSheet } from 'react-native'

import { Color } from '../assets/theme/color'
import { CommonStyles } from '../assets/theme/common'
import { Fonts } from '../assets/theme/fonts'
import { ButtonStyle, ButtonType } from '../interfaces/button.interface'
import { WeakRelativeSize } from '../utils/relative'

export interface ButtonProps {
  /** Testing ID */
  testID?: string

  /** Label to show within the button */
  label?: string

  /** Child elements to show inside the button. This prop overrides `label`  */
  children?: Element | Element[]

  /** Whether the button is disabled */
  isDisabled?: boolean

  /** Whether the button is loading */
  isLoading?: boolean

  /** Whether the button should fit in the space */
  fit?: boolean

  /** Whether the button should have a margin bottom */
  withMargin?: boolean

  /** Button extra styles */
  style?: StyleProp<ViewStyle>

  /** Event triggered when the button is clicked */
  onPress: () => void
}

/** Button of normal type */
export function NormalButton(props: ButtonProps) {
  return <Button {...props} type={ButtonType.Normal} />
}

export type BusyModeVariant = 'success' | 'danger' | 'invert'

/** Rounded button */
export function RoundedButton(props: ButtonProps & { variant?: BusyModeVariant }) {
  return <Button {...props} type={ButtonType.Rounded} variant={props.variant} />
}

/** Link button */
export function Link(props: ButtonProps) {
  return <Button {...props} type={ButtonType.Link} />
}

export function SettingsLink(props: ButtonProps) {
  return <Button {...props} type={ButtonType.Link} variant="settings" />
}

interface InternalButtonProps extends ButtonProps, TouchableOpacityProps {
  /** Type of button */
  type: ButtonType

  /** Color palette for the button */
  variant?: string

  /** Whether the button should fit in the space */
  fit?: boolean

  /** Whether the button should have a margin bottom */
  withMargin?: boolean

  /** Event triggered when the button is clicked */
  onPress: () => void
}

/**
 * Button component
 */
function Button(props: InternalButtonProps) {
  const { label, onPress, isLoading } = props
  const typeStyles = buttonTypeStyles[props.type]
  const variantStyles =
    props.variant && typeStyles.variants ? typeStyles.variants[props.variant] : undefined
  const loaderColor = variantStyles?.loaderColor ?? typeStyles.loaderColor ?? Color.white

  return (
    <TouchableOpacity
      {...props}
      disabled={props.isDisabled}
      style={[
        props.style,
        typeStyles.container,
        variantStyles?.container,
        props.fit && generalStyles.fit,
        props.isDisabled && generalStyles.disabled,
        props.withMargin && generalStyles.withMargin,
      ]}
      onPress={onPress}>
      {label && <Text style={[typeStyles.label, variantStyles?.label]}>{label}</Text>}

      {props.children}

      {isLoading && (
        <ActivityIndicator
          animating={true}
          color={loaderColor}
          style={[typeStyles.loader, variantStyles?.loader]}
        />
      )}
    </TouchableOpacity>
  )
}

// Styles

export const ButtonColor = {
  container: '#161616',
  text: Color.white,
  link: '#161616',

  settingsLink: Color.blue,

  success: Color.success,
  danger: Color.error,
}

export const generalStyles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  fit: {
    marginHorizontal: 10,
    width: '100%',
  },
  withMargin: CommonStyles.separationBottom,
})

export const buttonTypeStyles: Record<ButtonType, ButtonStyle> = {
  normal: StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: ButtonColor.container,
      borderRadius: WeakRelativeSize(5),
      flexDirection: 'row',
      height: WeakRelativeSize(57),
      justifyContent: 'center',
      paddingHorizontal: WeakRelativeSize(24),
    },
    label: {
      alignSelf: 'center',
      color: ButtonColor.text,
      fontSize: WeakRelativeSize(20),
      textAlign: 'center',
    },
    loader: { position: 'absolute', right: WeakRelativeSize(15) },
  }),

  rounded: {
    container: {
      alignItems: 'center',
      backgroundColor: ButtonColor.container,
      borderRadius: WeakRelativeSize(16),
      flexDirection: 'row',
      height: WeakRelativeSize(32),
      justifyContent: 'center',
      paddingHorizontal: WeakRelativeSize(13),
    },
    label: {
      alignSelf: 'center',
      color: ButtonColor.text,
      fontFamily: Fonts.Regular,
      fontSize: WeakRelativeSize(14),
      textAlign: 'center',
    },
    loader: {
      marginLeft: WeakRelativeSize(6),
    },
    variants: {
      success: {
        container: {
          backgroundColor: ButtonColor.success,
        },
      },
      danger: {
        container: {
          backgroundColor: ButtonColor.danger,
        },
      },
      invert: {
        container: {
          backgroundColor: ButtonColor.text,
          borderColor: ButtonColor.container,
          borderWidth: 1,
        },
        label: {
          color: ButtonColor.container,
        },
        loaderColor: ButtonColor.container,
      },
    },
  },

  link: {
    container: {},
    label: {
      fontFamily: Fonts.Regular,
      fontSize: WeakRelativeSize(14),
      textDecorationLine: 'underline',
    },
    loader: { position: 'absolute', left: WeakRelativeSize(-32) },
    loaderColor: ButtonColor.link,
    variants: {
      settings: {
        loaderColor: ButtonColor.settingsLink,
        label: {
          color: ButtonColor.settingsLink,
          textDecorationLine: 'none',
          fontSize: WeakRelativeSize(16),
        },
      },
    },
  },
}
