import { useTimerStore } from '@/entities/timer';
import { AchievementsList } from '@/widgets/Achievements/ui/AchievementsList';
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AchievementsPage(){
  const {isTimer, setIsTimer} = useTimerStore();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
        <View style={{
          gap: 10,
          width: "90%",
          paddingTop: insets.top + 5,      // отступ от шторки + зазор
          paddingBottom: insets.bottom + 5, // отступ от кнопок навигации + зазор
          alignContent: "center",
          alignSelf: "center",
        }}>
          <AchievementsList/>
        </View>
    </View>
  )
}