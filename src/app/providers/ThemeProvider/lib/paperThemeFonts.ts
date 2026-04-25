import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,

    // основной текст
    bodyLarge: {
      fontFamily: 'Rubik_400Regular',
    },
    bodyMedium: {
      fontFamily: 'Rubik_400Regular',
    },

    // заголовки
    titleLarge: {
      fontFamily: 'Rubik_500Medium',
    },

    // жирный
    headlineMedium: {
      fontFamily: 'Rubik_700Bold',
    },
  },
};