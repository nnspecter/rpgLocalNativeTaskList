import { AfterCompleteSnackbar } from '@/shared/ui/Snackbar';
import { Character } from '@/widgets/Character';
import { Metrics } from '@/widgets/Metrics';
import { Tasks } from '@/widgets/Tasks';
import NewTaskDialog from '@/widgets/Tasks/ui/NewTask/NewTaskDialog';
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Main(){
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
        <View style={{
          gap: 10,
          paddingTop: insets.top + 5,
          paddingBottom: insets.bottom + 5,
          alignContent: "center",
          alignSelf: "center",
        }}>
          <Character/>
          <Tasks/>
          <Metrics/>
          <AfterCompleteSnackbar/>
          <NewTaskDialog />
        </View>
    </View>
  )
}