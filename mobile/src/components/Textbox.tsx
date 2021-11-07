import React, { useMemo, useState } from 'react'
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export enum TextboxIcon {
  Check = 'check',
  CheckOutline = 'check-outline',
}

export interface TextboxProps extends TextInputProps {
  /** Label to show above the input */
  label?: string

  /** Input placeholder */
  placeholder?: string

  /** Src of the icon to show */
  icon?: string

  value: string

  /** Whether the value is a password */
  isPassword?: boolean

  /** Whether the input should fit in the space */
  fit?: boolean

  error?: string

  onInput: (value: string) => void
}

/**
 * Text input
 */
export function Textbox(props: TextboxProps) {
  const [isDirty, setDirty] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [focused, setFocused] = useState(false)

  const containerStyles = useMemo(
    () => [
      styles.container,
      focused && styles.containerFocused,
      props.multiline && styles.containerMultiline,
    ],
    [focused, props.multiline],
  )

  const inputStyles = useMemo(
    () => [
      styles.input,
      isDirty && props.error && styles.inputError,
      props.multiline && styles.inputMultiline,
    ],
    [isDirty, props.error, props.multiline],
  )
  const placeholderColor = useMemo(() => {
    if (isDirty && props.error) {
      return Color.error
    }
    return focused ? Color.black : Color.grey
  }, [focused, isDirty, props.error])

  function onInput(text: any) {
    setDirty(true)
    props.onInput(text)
  }

  return (
    <View style={[styles.wrapper, props.fit && styles.wrapperFit]}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}

      <View style={containerStyles}>
        <TextInput
          {...props}
          placeholder={props.placeholder}
          placeholderTextColor={placeholderColor}
          style={inputStyles}
          value={props.value}
          secureTextEntry={props.isPassword && !passwordVisible}
          onChangeText={onInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {props.icon && (
          <View style={[styles.iconContainer, styles.iconContainerWithBorder]}>
            <Icon name={props.icon} style={styles.icon} />
          </View>
        )}

        {props.isPassword && (
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.iconContainer}>
            <Icon
              name={passwordVisible ? 'eye-slash' : 'eye'}
              style={[
                styles.icon,
                passwordVisible ? styles.iconBlack : styles.iconGrey,
                styles.iconBig,
              ]}
            />
          </TouchableOpacity>
        )}

        {props.maxLength && <Text style={styles.maxLength}>{props.maxLength}</Text>}
      </View>

      {isDirty && props.error && (
        <Text testID={props.testID ? `${props.testID}.error` : undefined} style={styles.error}>
          {props.error}
        </Text>
      )}
    </View>
  )
}

// Style

import { StyleSheet } from 'react-native'

import { Color } from '../assets/theme/color'
import { WeakRelativeSize } from '../utils/relative'

const styles = StyleSheet.create({
  container: {
    borderColor: Color.lightGrey,
    borderRadius: WeakRelativeSize(5),
    borderWidth: 1,
    flexDirection: 'row',
    height: WeakRelativeSize(59),
    justifyContent: 'space-between',
  },
  containerFocused: {
    borderColor: Color.secondGrey,
  },

  containerMultiline: {
    alignItems: 'flex-start',
    height: WeakRelativeSize(150),
    paddingTop: WeakRelativeSize(12),
  },
  containerSmall: {
    height: WeakRelativeSize(41),
  },
  error: {
    color: Color.error,
    marginLeft: WeakRelativeSize(10),
    marginTop: WeakRelativeSize(6),
  },
  icon: {
    color: Color.primary,
    fontSize: WeakRelativeSize(12),
  },

  iconBig: {
    fontSize: WeakRelativeSize(24),
  },

  iconBlack: {
    color: Color.black,
  },
  iconContainer: {
    alignItems: 'center',
    bottom: WeakRelativeSize(5),
    height: WeakRelativeSize(24),
    justifyContent: 'center',
    margin: WeakRelativeSize(0),
    position: 'absolute',
    right: WeakRelativeSize(14),
    top: WeakRelativeSize(16),
    width: WeakRelativeSize(24),
  },
  iconContainerWithBorder: {
    backgroundColor: Color.black,
    borderRadius: WeakRelativeSize(24),
  },

  iconGrey: {
    color: Color.grey,
  },
  input: {
    color: Color.black,
    flex: 1,
    paddingHorizontal: WeakRelativeSize(15),
    paddingRight: WeakRelativeSize(15 + 18),
    fontSize: WeakRelativeSize(16),
  },
  inputError: {
    color: Color.error,
  },
  inputMultiline: {
    textAlignVertical: 'top',
  },
  label: {
    color: Color.black,
    fontSize: WeakRelativeSize(16),
    marginBottom: WeakRelativeSize(10),
  },
  maxLength: {
    bottom: WeakRelativeSize(8),
    color: Color.black,
    fontSize: WeakRelativeSize(13),
    position: 'absolute',
    right: WeakRelativeSize(14),
  },

  wrapper: {
    alignItems: 'flex-start',
    marginBottom: WeakRelativeSize(24),
    marginHorizontal: WeakRelativeSize(35),
  },

  wrapperFit: {
    flex: 1,
    width: '100%',
  },
})
