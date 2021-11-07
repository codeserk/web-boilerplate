import { by, element } from 'detox'

export async function expectButtonIsDisabled(id: string) {
  return new Promise<void>((resolve, reject) => {
    element(by.id(id))
      .tap()
      .then(() => reject(`The button with id "${id}" is clickable`))
      .catch(() => resolve())
  })
}
