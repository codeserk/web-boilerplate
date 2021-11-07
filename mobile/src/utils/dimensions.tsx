import { Dimensions, Platform } from 'react-native'

/** Device width */
export const deviceWidth: number = Dimensions.get('window').width

/** Device height, depends on the platform */
export const deviceHeight: number =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT')
