'use no memo';
import React from 'react';
import { FlexWidget, ImageWidget, TextWidget } from 'react-native-android-widget';
import { ColorProp } from 'react-native-android-widget';

const themes: Record<'light' | 'dark', { card: ColorProp; text: ColorProp; primary: ColorProp; chipBg: ColorProp; chipText: ColorProp; muted: ColorProp }> = {
  light: {
    card: '#FFFFFF' as ColorProp,
    text: '#1C1B1F' as ColorProp,
    primary: '#7C3AED' as ColorProp,
    chipBg: '#EEF0FF' as ColorProp,
    chipText: '#534AB7' as ColorProp,
    muted: '#9E9E9E' as ColorProp,
  },
  dark: {
    card: '#1E1E2E' as ColorProp,
    text: '#E6E1E5' as ColorProp,
    primary: '#A78BFA' as ColorProp,
    chipBg: '#2D2B55' as ColorProp,
    chipText: '#AFA9EC' as ColorProp,
    muted: '#6B7280' as ColorProp,
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
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.card,
        borderRadius: 12,
      }}
      clickAction="OPEN_APP"
      accessibilityLabel="Streak widget"
    >
      {/* Стрик */}
      <FlexWidget
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TextWidget
          text={`${streak}`}
          style={{
            fontSize: 36,
            fontFamily: 'Inter',
            color: theme.text,
          }}
        />
        <ImageWidget
          image={
            todayUpdate
              ? require('@assets/widgets/fire.png')
              : require('@assets/widgets/fire-grey.png')
          }
          imageWidth={26}
          imageHeight={26}
          style={{ marginLeft: 4 }}
        />
      </FlexWidget>

      {/* Уровень (чип) */}
      <FlexWidget
        style={{
          backgroundColor: theme.chipBg,
          borderRadius: 6,
          paddingHorizontal: 12,
          paddingVertical: 4,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TextWidget
          text="lvl"
          style={{
            fontSize: 13,
            fontFamily: 'Inter',
            color: theme.chipText,
          }}
        />
        <FlexWidget style={{ width: 4 }} />
        <TextWidget
          text={`${level}`}
          style={{
            fontSize: 16,
            fontFamily: 'Inter',
            color: theme.chipText,
            fontWeight: '700',
          }}
        />
      </FlexWidget>
    </FlexWidget>
  );
}