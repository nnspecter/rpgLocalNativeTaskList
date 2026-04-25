import { StyleSheet } from 'react-native';
import { AppTheme } from '@/app/providers/ThemeProvider/lib/paperTheme';

export const createStyles = (colors: AppTheme['colors'], dark: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 24,
      alignItems: 'center',
    },
    title: {
      fontSize: 17,
      fontWeight: '600',
      color: colors.onBackground,
      marginBottom: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    column: {
      alignItems: 'center',
      width: 90,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.onBackground,
      marginBottom: 8,
    },
    wheelContainer: {
      width: 90,
    },
    selectedLayout: {
      backgroundColor: dark ? colors.border : '#F2F2F7',
      borderRadius: 10,
    },
    elementText: {
      fontSize: 20,
      color: colors.onBackground,
    },
    colon: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.onBackground,
      marginTop: 24,
      paddingHorizontal: 4,
    },
  });