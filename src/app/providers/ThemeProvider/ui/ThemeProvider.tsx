import React from 'react'
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper'
import { darkTheme, lightTheme } from '../lib/paperTheme';

export const ThemeProvider = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
  return (
    <PaperProvider theme={isDark ? darkTheme : lightTheme}>
          <ThemeProvider>

          </ThemeProvider>
    </PaperProvider>
  )
}
