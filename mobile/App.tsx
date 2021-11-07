import 'react-native-url-polyfill/auto'

import { resources } from 'frontend/i18n/resources'
import { AuthStoreContext, useAuthStore } from 'frontend/modules/auth/auth.store'
import { EntriesStoreContext, useEntriesStore } from 'frontend/modules/entries/entry.store'
import { SettingsStoreContext, useSettingsStore } from 'frontend/modules/settings/settings.store'
import { Compose } from 'frontend/utils/store'
import i18n from 'i18next'
import React from 'react'
import { initReactI18next } from 'react-i18next'
import { StatusBar } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import { Navigator } from 'src/router'
import { setDefaultFont } from 'src/utils/font'

import { config } from './src/helpers/config'
import { AsyncStorageRepository } from './src/utils/async-storage.repository'
import { transformHttpLayer } from './src/utils/http-transformer'

i18n.use(initReactI18next).init({
  lng: 'en',
  resources,
})

setDefaultFont()
transformHttpLayer()

const asyncStorageRepository = new AsyncStorageRepository()

const App = () => {
  const settings = useSettingsStore(config, asyncStorageRepository)
  const auth = useAuthStore(settings)
  const entries = useEntriesStore(settings, auth)

  return (
    <Compose
      components={[
        [SettingsStoreContext.Provider, { value: settings }],
        [AuthStoreContext.Provider, { value: auth }],
        [EntriesStoreContext.Provider, { value: entries }],
      ]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <Navigator />

      <FlashMessage position="top" />
    </Compose>
  )
}

export default App
