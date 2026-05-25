import React from 'react'
import { StyleSheet, View, useColorScheme } from 'react-native'
import { useTheme } from 'react-native-paper'
import OneMetric from './OneMetric/OneMetric'
import i18n from '../../../shared/config/i18n'
import { AppTheme } from '../../../app/providers/ThemeProvider/lib/paperTheme'
import { useMetricsStore } from '../../../entities/metrics/model/metricsStore'

const getColors = (isDark: boolean) => ({
  streak: {
    bg: isDark ? '#2A2660' : '#EEEDFE',
    number: isDark ? '#B0AAFF' : '#3C3489',
    label: isDark ? '#9B94F5' : '#534AB7',
  },
  done: {
    bg: isDark ? '#0D2E27' : '#E1F5EE',
    number: isDark ? '#5ECBA8' : '#085041',
    label: isDark ? '#3DB890' : '#0F6E56',
  },
})

export const Metrics = () => {
  const theme = useTheme<AppTheme>()
  const colorScheme = useColorScheme()
  const isDark = theme.dark ?? colorScheme === 'dark'
  const COLORS = getColors(isDark)
  const {streak, completedTasks} = useMetricsStore();

  return (
    <View style={styles.container}>
      <OneMetric metric={streak ?? 0} str={i18n.t('metrics.streak')} color={COLORS.streak} />
      <OneMetric metric={completedTasks} str={i18n.t('metrics.done')} color={COLORS.done} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
  },
})