import { AfterCompleteSnackbar } from '@/shared/ui/Snackbar';
import { Character } from '@/widgets/Character';
import { Metrics } from '@/widgets/Metrics';
import { BottomSheets, ChangeTaskBottomSheet, NewTaskBottomSheet, Tasks } from '@/widgets/Tasks';

import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Main(){
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
        <View style={{
          gap: 10,
          paddingTop: insets.top +2,
          alignContent: "center",
          alignSelf: "center",
        }}>
          <Character/>
          <Metrics/>
          <Tasks/>
          <AfterCompleteSnackbar/>
          <BottomSheets/>
        </View>
    </View>
  )
}