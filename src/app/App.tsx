import { StyleSheet, View, useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "./providers/ThemeProvider/lib/paperTheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { useEffect } from "react";
import { useTasksStore } from "@/entities/tasks";
import { useMetricsStore } from "@/entities/metrics";
import { useTimerStore } from "@/entities/timer";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { DefaultTheme, DarkTheme, NavigationContainer } from '@react-navigation/native';
import { Timer } from '@/widgets/Timer';
import { TabNavigator } from "./navigation/TabNavigator";
import { BottomSheets, ChangeTaskBottomSheet, NewTaskBottomSheet } from "@/widgets/Tasks";


export default function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { resetDaily } = useTasksStore();
  const { checkAndResetStreak } = useMetricsStore();
  const { isTimer } = useTimerStore();
  const bgColor = isDark ? "#121212" : "#F4F4F8";

  const navTheme = isDark
    ? { ...DarkTheme, colors: { ...DarkTheme.colors, background: '#121212' } }
    : { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#F4F4F8' } };

  useEffect(() => {
    checkAndResetStreak();
    resetDaily();
  }, []);

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: bgColor }}>
      <SafeAreaProvider>
        <StatusBar
          style={isDark ? "light" : "dark"}
        />
        <PaperProvider theme={isDark ? darkTheme : lightTheme}>
          <NavigationContainer theme={navTheme}>
            <TabNavigator />
            
            {isTimer && (
              <View style={[styles.timerOverlay, { backgroundColor: bgColor }]}>
                <Timer />
              </View>
            )}
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  timerOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
});