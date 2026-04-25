import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { WheelPicker } from 'react-native-infinite-wheel-picker';
import { AppTheme } from '@/app/providers/ThemeProvider/lib/paperTheme';
import { createStyles } from './TimeSetter.styles';


interface TimeSetterProps {
  time: number;
  setTime: (time: number) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) =>
  String(i).padStart(2, '0')
);

const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, '0')
);

export const TimeSetter = ({ time, setTime }: TimeSetterProps) => {
  const { colors, dark } = useTheme<AppTheme>();
  const styles = useMemo(() => createStyles(colors, dark), [colors, dark]);

  const hours = useMemo(() => Math.floor(time / 60) % 24, [time]);
  const minutes = useMemo(() => time % 60, [time]);
  const handleHoursChange = (index: number) => {
    setTime(index * 60 + minutes);
  };
  const handleMinutesChange = (index: number) => {
    setTime(hours * 60 + index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Время</Text>

      <View style={styles.row}>

        {/* ЧАСЫ */}
        <View style={styles.column}>
          <Text style={styles.label}>Часы</Text>
          <WheelPicker
            data={HOURS}
            selectedIndex={hours}
            onChangeValue={handleHoursChange}
            restElements={2}
            elementHeight={56}
            containerStyle={styles.wheelContainer}
            selectedLayoutStyle={styles.selectedLayout}
            elementTextStyle={styles.elementText}
          />
        </View>

        <Text style={styles.colon}>:</Text>

        {/* МИНУТЫ */}
        <View style={styles.column}>
          <Text style={styles.label}>Минуты</Text>
          <WheelPicker
            data={MINUTES}
            selectedIndex={minutes}
            onChangeValue={handleMinutesChange}
            restElements={2}
            elementHeight={56}
            containerStyle={styles.wheelContainer}
            selectedLayoutStyle={styles.selectedLayout}
            elementTextStyle={styles.elementText}
          />
        </View>
      </View>
    </View>
  );
};


