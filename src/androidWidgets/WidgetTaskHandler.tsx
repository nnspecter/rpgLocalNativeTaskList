import React from 'react';
import { Appearance } from 'react-native';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { HelloWidget } from './HelloWidget';
import { StreakWidget } from './StreakWidget';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getMetrics(): Promise<{ streak: number; todayUpdate: boolean }> {
  try {
    const raw = await AsyncStorage.getItem('metricsStore-storage2');
    if (!raw) return { streak: 0, todayUpdate: false };

    const parsed = JSON.parse(raw);
    const state = parsed?.state;

    return {
      streak: state?.streak ?? 0,
      todayUpdate: state?.todayUpdate ?? false,
    };
  } catch {
    return { streak: 0, todayUpdate: false };
  }
}

const nameToWidget = {
  Hello: HelloWidget,
  Streak: StreakWidget,
};

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];
  const isDark = Appearance.getColorScheme() === 'dark';

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE': {
      const { streak, todayUpdate } = await getMetrics();
      props.renderWidget(<Widget isDark={isDark} streak={streak} todayUpdate={todayUpdate} />);
      break;
    }

    case 'WIDGET_RESIZED':
    case 'WIDGET_DELETED':
    case 'WIDGET_CLICK':
    default:
      break;
  }
}