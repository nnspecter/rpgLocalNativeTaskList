import { useTimerStore } from '@/entities/timer';
import { AfterCompleteSnackbar } from '@/shared/ui/Snackbar';
import { Character } from '@/widgets/Character';
import { Metrics } from '@/widgets/Metrics';
import { Tasks } from '@/widgets/Tasks';
import { Timer } from '@/widgets/Timer';
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Achivments(){
  const {isTimer, setIsTimer} = useTimerStore();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      {!isTimer ?
        <View style={{
          gap: 10,
          width: "90%",
          paddingTop: insets.top + 5,      // отступ от шторки + зазор
          paddingBottom: insets.bottom + 5, // отступ от кнопок навигации + зазор
          alignContent: "center",
          alignSelf: "center",
        }}>
          <AfterCompleteSnackbar/>
        </View>
      :
        <Timer/>
      }
    </View>
  )
}