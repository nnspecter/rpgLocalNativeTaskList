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
}

export function StreakWidget({ isDark = false, streak = 0, todayUpdate = false }: StreakWidgetProps) {
  const theme = isDark ? themes.dark : themes.light;

  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
        borderRadius: 16,
      }}
      accessibilityLabel="Streak widget"
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
            ? require("../../assets/widgets/fire.png")
            : require("../../assets/widgets/fire-grey.png")
        }
        imageWidth={44}
        imageHeight={44}
        style={{ marginRight: 8 }}
      />
    </FlexWidget>
  );
}