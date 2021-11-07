import { RefObject } from 'react'
import FlashMessage, { MessageOptions, showMessage } from 'react-native-flash-message'

/**
 * Shows a success message
 * @param message
 * @param ref
 */
export function showSuccess(message: string, ref?: RefObject<FlashMessage>) {
  const options: MessageOptions = {
    message,
    type: 'success',
    icon: 'success',
    duration: 5000,
  }

  if (ref?.current) {
    ref.current.showMessage(options)
  } else {
    showMessage(options)
  }
}

/**
 * Shows an error message
 * @param message
 * @param ref
 */
export function showError(message: string, ref?: RefObject<FlashMessage>) {
  const options: MessageOptions = {
    message,
    type: 'danger',
    icon: 'danger',
    duration: 5000,
  }

  if (ref?.current) {
    ref.current.showMessage(options)
  } else {
    showMessage(options)
  }
}
