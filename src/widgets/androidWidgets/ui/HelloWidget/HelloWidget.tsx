'use no memo';
import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';
import { Appearance } from 'react-native';

export function HelloWidget() {
  const isDark = Appearance.getColorScheme() === 'dark';

  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDark ? '#1E1E2E' : '#FFFFFF',
        borderRadius: 12,
      }}
      accessibilityLabel="Hello widget"
    >
      <TextWidget
        text="RPGTasks"
        style={{
          fontSize: 20,
          fontFamily: 'Inter',
          color: isDark ? '#E6E1E5' : '#1C1B1F',
        }}
      />
    </FlexWidget>
  );
}