import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// 👇 расширяем тип темы
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,

    background: '#F4F4F8',
    primary: '#6200ee',
    surface: '#FFFFFF',

    // стандартные paper цвета
    onBackground: '#1C1B1F',
    onSurface: '#1C1B1F',

    // 👇 твои кастомные
    card: '#FFFFFF',
    border: '#e0e0e0',
    inputBackground: '#FAFAFA',
    avatarBackground: '#EEF0FF',
    errorBackground: '#FFEDEC',
    errorText: '#BA1A1A',
    buttonDisabled: '#9E9E9E',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,

    background: '#121212',
    primary: '#816bfd',
    surface: '#1E1E2E',

    onBackground: '#E6E1E5',
    onSurface: '#E6E1E5',

    // 👇 твои кастомные
    card: '#1E1E2E',
    border: '#333333',
    inputBackground: '#2A2A3A',
    avatarBackground: '#2D2B55',
    errorBackground: '#3B1A1A',
    errorText: '#FF8A80',
    buttonDisabled: '#555555',
  },
};

// 👇 тип темы
export type AppTheme = typeof lightTheme;