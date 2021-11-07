import '../styles/antd.less'
import 'moment/locale/es'

import { config as fontAwesomeConfig, dom } from '@fortawesome/fontawesome-svg-core'
import { resources } from 'frontend/i18n/resources'
import { AuthStoreContext, useAuthStore } from 'frontend/modules/auth/auth.store'
import { EntriesStoreContext, useEntriesStore } from 'frontend/modules/entries/entry.store'
import { SettingsStoreContext, useSettingsStore } from 'frontend/modules/settings/settings.store'
import { Compose } from 'frontend/utils/store'
import i18n from 'i18next'
import moment from 'moment'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { initReactI18next } from 'react-i18next'
import { AppLayout } from 'src/components/Layout/AppLayout'
import { config } from 'src/config'
import { LocalStorageRepository } from 'src/utils/local-storage.repository'

fontAwesomeConfig.autoAddCss = false

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources,
})
moment.locale('en')

const localStorageRepository = new LocalStorageRepository()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const settings = useSettingsStore(config, localStorageRepository)
  const auth = useAuthStore(settings)
  const entries = useEntriesStore(settings, auth)

  const { isInitialized, isAuthenticated, isAdmin } = auth
  const isForbidden =
    (isInitialized && !isAuthenticated && !router.asPath.includes('/auth')) ||
    (!isAdmin && router.asPath.includes('/admin'))

  useEffect(() => {
    if (isInitialized) {
      if (!isAuthenticated && !router.asPath.includes('/auth')) {
        router.replace('/auth/login')
      }
      if (isAuthenticated && router.pathname.includes('/auth')) {
        router.replace('/')
      }
      if (isAuthenticated && !isAdmin && router.asPath.includes('/admin')) {
        router.replace('/')
      }
    }
  }, [isInitialized, isAuthenticated, router.asPath.includes('/auth')])

  return (
    <Compose
      components={[
        [SettingsStoreContext.Provider, { value: settings }],
        [AuthStoreContext.Provider, { value: auth }],
        [EntriesStoreContext.Provider, { value: entries }],
      ]}>
      <Head>
        <style>{dom.css()}</style>
      </Head>
      <AppLayout>{isInitialized && !isForbidden && <Component {...pageProps} />}</AppLayout>
    </Compose>
  )
}
