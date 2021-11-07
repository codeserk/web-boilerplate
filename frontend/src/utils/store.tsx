import React, { FC, Fragment, ProviderExoticComponent } from 'react'

type Components = [ProviderExoticComponent<any>, Record<string, any>]

interface Props {
  components: Components[]
}

export const Compose: FC<Props> = ({ components, children }) => (
  <Fragment>
    {components.reverse().reduce((acc, curr) => {
      const [Provider, props] = Array.isArray(curr) ? [curr[0], curr[1]] : [curr, {}]
      return <Provider {...props}>{acc}</Provider>
    }, children)}
  </Fragment>
)

type KeyType = string | number
interface Entity<K> {
  readonly id: K
}

type EntityReducerAction<K extends KeyType, E extends Entity<K>> =
  | { type: 'addOne'; item: E }
  | { type: 'addMany'; items: Record<K, E> | E[] }
  | { type: 'removeOne'; id: K }
  | { type: 'clear' }

export type EntityReducer<K extends KeyType, E extends Entity<K>> = (
  state: Record<K, E>,
  action: EntityReducerAction<K, E>,
) => Record<K, E>

export function entityReducer<K extends KeyType, E extends Entity<K>>(
  state: Record<K, E>,
  action: EntityReducerAction<K, E>,
) {
  const newState = { ...state }
  switch (action.type) {
    case 'addOne':
      newState[action.item.id] = action.item
      break
    case 'addMany': {
      const items = Array.isArray(action.items)
        ? action.items
        : (Object.values(action.items) as E[])

      for (const item of items) {
        newState[item.id] = item
      }
      break
    }
    case 'removeOne':
      delete newState[action.id]
      break

    case 'clear':
      return {}
  }
  return newState
}

type MapReducerAction<K extends KeyType, E> =
  | { type: 'addOne'; key: K; value: E; clear?: boolean }
  | { type: 'addMany'; items: Record<K, E>; clear?: boolean }
  | { type: 'removeOne'; key: K }
  | { type: 'clear' }

export type MapReducer<K extends KeyType, E> = (
  state: Record<K, E>,
  action: MapReducerAction<K, E>,
) => Record<K, E>

export function mapReducer<K extends KeyType, E>(
  state: Record<K, E>,
  action: MapReducerAction<K, E>,
) {
  let newState = { ...state }
  switch (action.type) {
    case 'addOne':
      newState = (action.clear ? {} : newState) as Record<K, E>
      newState[action.key] = action.value
      break
    case 'addMany': {
      newState = (action.clear ? {} : newState) as Record<K, E>
      for (const key in action.items) {
        newState[key] = action.items[key]
      }

      break
    }
    case 'removeOne':
      delete newState[action.key]
      break

    case 'clear':
      return {}
  }
  return newState
}
