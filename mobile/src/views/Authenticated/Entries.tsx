import { EntriesStoreContext } from 'frontend/modules/entries/entry.store'
import moment from 'moment'
import React, { useContext, useMemo } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Color } from '../../assets/theme/color'
import { CommonStyles } from '../../assets/theme/common'
import { Link } from '../../components/Button'
import { deviceWidth } from '../../utils/dimensions'
import { RelativeSize } from '../../utils/relative'
import { EntryItem } from './Entries/EntryItem'

/**
 * Tracker view
 */
export function EntriesView() {
  const { isLoading, date, entries, changeDate } = useContext(EntriesStoreContext)

  const formattedDate = useMemo(() => moment(date).format('YYYY-MM-DD'), [date])

  return (
    <SafeAreaView
      style={[CommonStyles.container, isLoading && styles.loading]}
      testID="EntriesScreen">
      <View style={styles.header}>
        <Link onPress={() => changeDate(moment(date).subtract(1, 'day').toDate())}>
          <Icon name="chevron-left" color={Color.black} />
        </Link>
        <Text>{formattedDate}</Text>
        <Link
          onPress={() => changeDate(moment(date).add(1, 'day').toDate())}
          isDisabled={moment(date).isSame(moment(), 'day')}>
          <Icon name="chevron-right" color={Color.black} />
        </Link>
      </View>

      <FlatList
        data={entries}
        renderItem={({ item }) => <EntryItem {...item} />}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      {isLoading && <ActivityIndicator style={styles.loader} color={Color.primary} size="large" />}
    </SafeAreaView>
  )
}

// Styles

const styles = StyleSheet.create({
  loading: {
    opacity: 0.5,
  },

  header: {
    display: 'flex',
    width: deviceWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: RelativeSize(12),
  },

  list: {
    paddingHorizontal: 10,
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
})
