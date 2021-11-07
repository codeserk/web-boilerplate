import { by, device, element, expect } from 'detox'

import { expectButtonIsDisabled } from '../utils'

describe('auth > login', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  afterEach(async () => {
    await device.reloadReactNative()
  })

  test('should show an error if the username is empty', async () => {
    await expect(element(by.id('LoginScreen.inputUsername'))).toBeVisible()
    await expect(element(by.id('LoginScreen.inputPassword'))).toBeVisible()
    await element(by.id('LoginScreen.inputUsername')).typeText('a')
    await element(by.id('LoginScreen.inputUsername')).tapBackspaceKey()

    await expect(element(by.id('LoginScreen.inputUsername.error'))).toBeVisible()
    await expectButtonIsDisabled('LoginScreen.buttonSubmit')
  })

  test('should show an error if the the password is empty', async () => {
    await element(by.id('LoginScreen.inputPassword')).typeText('t')
    await element(by.id('LoginScreen.inputPassword')).tapBackspaceKey()

    await expect(element(by.id('LoginScreen.inputPassword.error'))).toBeVisible()
    await expectButtonIsDisabled('LoginScreen.buttonSubmit')
  })

  test('should show an error if the password is incorrect', async () => {
    await element(by.id('LoginScreen.inputUsername')).typeText('error')
    await element(by.id('LoginScreen.inputPassword')).typeText('password')
    await device.pressBack()
    await element(by.id('LoginScreen.buttonSubmit')).tap()
    await element(by.id('LoginScreen.buttonSubmit')).tap()

    await expect(element(by.id('LoginScreen.inputPassword.error'))).toBeVisible()
  })

  test('should be able to login using the right credentials', async () => {
    await element(by.id('LoginScreen.inputUsername')).typeText('user1')
    await element(by.id('LoginScreen.inputPassword')).typeText('password')
    await device.pressBack()
    await element(by.id('LoginScreen.buttonSubmit')).tap()
    await element(by.id('LoginScreen.buttonSubmit')).tap()

    await expect(element(by.id('EntriesScreen'))).toBeVisible()
  })
})
