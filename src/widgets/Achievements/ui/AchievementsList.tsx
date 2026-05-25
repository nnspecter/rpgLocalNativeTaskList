import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import { useAchievementsStore } from '@/entities/Achievements'
import { Achievement, AchievementCard } from './AchievementCard'

export const AchievementsList = () => {
  const achievements = useAchievementsStore((state) => state.achievements)

  const renderItem = ({ item }: { item: Achievement }) => (
    <AchievementCard {...item} />
  )

  const keyExtractor = (item: Achievement) => String(item.id)

  return (
    <FlatList
      data={achievements}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    gap: 12,
  },
  row: {
    gap: 12,
    justifyContent: 'flex-start',
  },
})