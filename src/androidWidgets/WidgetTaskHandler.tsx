import React from 'react';
import { Appearance, Linking } from 'react-native';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { HelloWidget } from './ui/HelloWidget/HelloWidget';
import { StreakWidget } from './ui/StreakWidget/StreakWidget';
import { getMetrics } from './lib/getMetrics';
import { getLevel } from './lib/getLevel';


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
      const { level } = await getLevel();
      props.renderWidget(
        <Widget 
          isDark={isDark}
          streak={streak}
          todayUpdate={todayUpdate}
          level={level}
        />);
      break;
    }

    case 'WIDGET_RESIZED':
      break;
    case 'WIDGET_DELETED':
      break;
    case 'WIDGET_CLICK': {
      if(props.clickAction === "OPEN_APP") {
        Linking.openURL("rpgtasks://index")
      }
      break;
    }
    default:
      break;
  }
}