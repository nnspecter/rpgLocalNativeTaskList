import { requestWidgetUpdate } from 'react-native-android-widget';
import { StreakWidget2x2 } from '@/widgets/androidWidgets/ui/StreakWidget/StreakWidget2x2';
import { Appearance } from 'react-native';

export async function refreshStreakWidget2x2(streak: number, todayUpdate: boolean, level: number) {
  const isDark = Appearance.getColorScheme() === 'dark';

  await requestWidgetUpdate({
    widgetName: 'Streak',
    renderWidget: () => (
      <StreakWidget2x2 isDark={isDark} streak={streak} todayUpdate={todayUpdate} level={level} />
    ),
    widgetNotFound: () => {},
  });
}