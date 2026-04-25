import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

type Props = {
  metric: number
  str: string
  color: {
    bg: string
    number: string
    label: string
  }
}

export default function OneMetric({ metric, str, color }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: color.bg }]}>
      <Text style={[styles.metric, { color: color.number }]}>{metric}</Text>
      <Text style={[styles.label, { color: color.label }]}>{str}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 14,
    minWidth: 100,
  },
  metric: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
  },
  label: {
    fontSize: 11,
    marginTop: 2,
    letterSpacing: 0.3,
  },
})