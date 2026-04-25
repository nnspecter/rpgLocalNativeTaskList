import { useTimerStore } from '@/entities/timer';
import { AfterCompleteSnackbar } from '@/shared/ui/Snackbar';
import { Character } from '@/widgets/Character';
import { Metrics } from '@/widgets/Metrics';
import { Tasks } from '@/widgets/Tasks';
import { Timer } from '@/widgets/Timer';
import React from 'react'
import { View } from 'react-native'

export default function Main(){
  const {isTimer, setIsTimer} = useTimerStore();
  return (
    <View >
      {!isTimer ?
      <View style={{paddingBottom: 30, gap: 10, paddingTop: 30, alignContent: "center", alignSelf: "center"}}>
        <Character/>
        <Tasks/>
        <Metrics/>
        <AfterCompleteSnackbar/>
      </View>
    :
    <Timer/>}
    
    </View>
  )
}
