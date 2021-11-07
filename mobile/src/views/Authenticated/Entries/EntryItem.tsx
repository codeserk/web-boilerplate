import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { Color } from '../../../assets/theme/color'
import { RelativeSize } from '../../../utils/relative'

interface Props {
  readonly title: string
  readonly description: string
  readonly image?: string
}

/**
 * Renders a diary entry item
 */
export function EntryItem(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>

      <View style={{ flex: 1 }} />
      {props.image && (
        <Image
          source={{ uri: props.image }}
          width={RelativeSize(48)}
          height={RelativeSize(48)}
          style={styles.image}
        />
      )}
    </View>
  )
}

// Styles

const styles = StyleSheet.create({
  container: {
    paddingVertical: RelativeSize(20),
    borderBottomWidth: 1,
    borderBottomColor: Color.whiteGrey,
  },

  image: {
    width: RelativeSize(250),
    height: RelativeSize(250),
    borderRadius: RelativeSize(6),
    alignSelf: 'center',
    marginTop: RelativeSize(20),
  },
  title: {
    fontSize: RelativeSize(18),
    lineHeight: RelativeSize(18),
    marginBottom: RelativeSize(14),
    color: Color.primary,
  },
  description: {
    fontSize: RelativeSize(18),
    lineHeight: RelativeSize(18),
    color: Color.grey,
  },
})
