import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import { useAchievementsStore } from '@/entities/Achievements'
import { Achievement, AchievementCard } from './AchievementCard'

export const AchievementsList = () => {
  const achievements = useAchievementsStore((state) => state.achievements)
  const setActive = useAchievementsStore((state) => state.setActive)

  const sorted = [...achievements].sort((a, b) => {
    if (a.isOpen !== b.isOpen) return a.isOpen ? -1 : 1
    return a.id - b.id
  })

  const renderItem = ({ item }: { item: Achievement }) => (
    <AchievementCard {...item} onPress={() => setActive(item.id)} />
  )

  const keyExtractor = (item: Achievement) => String(item.id)

  return (
    <FlatList
      data={sorted}
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