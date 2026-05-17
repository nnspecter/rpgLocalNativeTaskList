import { requestWidgetUpdate } from 'react-native-android-widget';
import { StreakWidget5x2 } from '@/widgets/androidWidgets/ui/StreakWidget/StreakWidget5x2';
import { Appearance } from 'react-native';

export async function refreshStreakWidget5x2(streak: number, todayUpdate: boolean) {
  const isDark = Appearance.getColorScheme() === 'dark';

  await requestWidgetUpdate({
    widgetName: 'Streak',
    renderWidget: () => (
      <StreakWidget5x2 isDark={isDark} streak={streak} todayUpdate={todayUpdate} />
    ),
    widgetNotFound: () => {},
  });
}