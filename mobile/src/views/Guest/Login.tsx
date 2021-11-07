import { AuthStoreContext } from 'frontend/modules/auth/auth.store'
import React, { useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CommonStyles } from '../../assets/theme/common'
import { NormalButton } from '../../components/Button'
import { Textbox } from '../../components/Textbox'

/**
 * Sign in view
 */
export function LoginView() {
  const { t } = useTranslation()

  const { isLoading, login } = useContext(AuthStoreContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [serverError, setServerError] = useState<string | undefined>()

  // Errors
  const isUsernameValid = useMemo(() => !!username, [username])
  const isPasswordValid = useMemo(() => password.length > 0, [password])
  const isValid = useMemo(
    () => !serverError && isUsernameValid && isPasswordValid,
    [serverError, isUsernameValid, isPasswordValid],
  )
  const passwordError = useMemo(() => {
    if (serverError) {
      return serverError
    }
    if (!isPasswordValid) {
      return t('auth.login.errors.password')
    }
  }, [serverError, isPasswordValid])

  function onUsernameChanged(newUsername: string) {
    setServerError(undefined)
    setUsername(newUsername)
  }
  function onPasswordChanged(newPassword: string) {
    setServerError(undefined)
    setPassword(newPassword)
  }

  async function submit() {
    const didLogin = await login(username, password)
    if (!didLogin) {
      setServerError(t('auth.login.errors.login'))
    }
  }

  return (
    <SafeAreaView style={CommonStyles.container} testID="LoginScreen">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        style={CommonStyles.keyboard}>
        <ScrollView>
          <View style={CommonStyles.header}>
            <Text style={CommonStyles.title}>{t('auth.login.title')}</Text>
            <Text style={CommonStyles.subtitle}>{t('auth.login.subtitle')}</Text>
          </View>

          <View style={CommonStyles.body}>
            <Textbox
              testID="LoginScreen.inputUsername"
              label={t('auth.login.username')}
              placeholder={t('auth.login.username')}
              value={username}
              autoCapitalize="none"
              onInput={onUsernameChanged}
              error={!isUsernameValid ? t('auth.login.errors.username') : undefined}
            />

            <Textbox
              testID="LoginScreen.inputPassword"
              label={t('auth.login.password')}
              placeholder={t('auth.login.password')}
              value={password}
              autoCapitalize="none"
              onInput={onPasswordChanged}
              error={passwordError}
              isPassword
            />

            <NormalButton
              testID="LoginScreen.buttonSubmit"
              label={t('auth.login.submit')}
              onPress={submit}
              isLoading={isLoading}
              isDisabled={isLoading || !isValid}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
