import { useTimerStore } from '@/entities/timer';
import { useAchievementsStore } from '@/entities/Achievements';
import { AchievementsList } from '@/widgets/Achievements/ui/AchievementsList';
import i18n from '@/shared/config/i18n';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';

export default function AchievementsPage(){
  const {isTimer, setIsTimer} = useTimerStore();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeCount = useAchievementsStore((state) => state.achievements.filter((a) => a.isActive).length);

  return (
    <View style={{ flex: 1 }}>
        <View style={{
          gap: 4,
          width: "90%",
          paddingTop: insets.top + 5,
          paddingBottom: insets.bottom + 5,
          alignContent: "center",
          alignSelf: "center",
          flex: 1,
        }}>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>{i18n.t('achievements.bonuses')}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>{i18n.t('achievements.subtitle')}</Text>
          <Text style={[styles.activeCount, { color: theme.colors.primary }]}>{i18n.t('achievements.activeCount', { count: activeCount })}</Text>
          <AchievementsList/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'left',
  },
  activeCount: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 4,
  },
});