'use no memo';
import React from 'react';
import { FlexWidget, ImageWidget, TextWidget } from 'react-native-android-widget';
import { ColorProp } from 'react-native-android-widget';

const themes: Record<'light' | 'dark', { background: ColorProp; text: ColorProp }> = {
  light: {
    background: '#F4F4F8' as ColorProp,
    text: '#121212' as ColorProp,
  },
  dark: {
    background: '#121212' as ColorProp,
    text: '#F4F4F8' as ColorProp,
  },
};

interface StreakWidgetProps {
  isDark?: boolean;
  streak?: number;
  todayUpdate?: boolean;
  level?: number;
}

export function StreakWidget5x2({
  isDark = false,
  streak = 0,
  todayUpdate = false,
  level = 0,
}: StreakWidgetProps) {
  const theme = isDark ? themes.dark : themes.light;

  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        margin: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
        borderRadius: 16,
      }}
      accessibilityLabel="Streak widget"
    >
      {/* Стрик */}
      <FlexWidget
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextWidget
          text={`${streak}`}
          style={{
            fontSize: 32,
            fontFamily: 'Inter',
            color: theme.text,
          }}
        />
        <ImageWidget
          image={
            todayUpdate
              ? require('../../../../assets/widgets/fire.png')
              : require('../../../../assets/widgets/fire-grey.png')
          }
          imageWidth={24}
          imageHeight={24}
          style={{ marginLeft: 4 }}
        />
      </FlexWidget>

      <FlexWidget style={{ width: 3 }} />

      {/* Уровень */}
      <FlexWidget
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextWidget
          text={`${level}`}
          style={{
            fontSize: 32,
            fontFamily: 'Inter',
            color: theme.text,
            
          }}
        />
        <FlexWidget style={{ width: 4 }} />
        <TextWidget
          text="lvl"
          style={{
            fontSize: 28,
            fontFamily: 'Inter',
            color: theme.text,
          }}
        />
      </FlexWidget>
    </FlexWidget>
  );
}