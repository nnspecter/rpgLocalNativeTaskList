import { QueryClientProvider } from "@tanstack/react-query";
import { StyleSheet, View, useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "./providers/ThemeProvider/lib/paperTheme";
import Main from "../pages/Main/Main";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "./providers/ThemeProvider/ui/ThemeContext";
import { PaperProvider } from "react-native-paper";
import { useEffect } from "react";
import { useTasksStore } from "@/entities/tasks";
import { useMetricsStore } from "@/entities/metrics";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { HelloWidgetPreviewScreen } from "@/androidWidgets/ui/HelloWidget/HelloWidgetPreviewScreen";


export default function App() {
  
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const {resetDaily} = useTasksStore();
  const {checkAndResetStreak} = useMetricsStore();
  const bgColor = isDark ? "#121212" : "#F4F4F8";
  
  useEffect(()=>{
    checkAndResetStreak();
    resetDaily();
  }, [])

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('transparent');
    NavigationBar.setPositionAsync('absolute');
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: bgColor }}>
      <SafeAreaProvider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          style={isDark ? "light" : "dark"}
        />
        <PaperProvider theme={isDark ? darkTheme : lightTheme}>
          <ThemeProvider>
            <View style={[styles.container, { backgroundColor: bgColor }]}>
              <Main/>
            </View>
          </ThemeProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});