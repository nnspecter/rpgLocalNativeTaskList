import { requestWidgetUpdate } from 'react-native-android-widget';
import { StreakWidget } from '@/androidWidgets/ui/StreakWidget/StreakWidget5x2';
import { Appearance } from 'react-native';

export async function refreshStreakWidget(streak: number, todayUpdate: boolean) {
  const isDark = Appearance.getColorScheme() === 'dark';

  await requestWidgetUpdate({
    widgetName: 'Streak',
    renderWidget: () => (
      <StreakWidget isDark={isDark} streak={streak} todayUpdate={todayUpdate} />
    ),
    widgetNotFound: () => {},
  });
}