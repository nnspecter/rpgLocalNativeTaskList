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


export default function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const {resetDaily} = useTasksStore();
  const {checkAndResetStreak} = useMetricsStore();
  useEffect(()=>{
    resetDaily();
    checkAndResetStreak();
  }, [])
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider theme={isDark ? darkTheme : lightTheme}>
          <ThemeProvider>
            <View
              style={[
                styles.container,
                { backgroundColor: isDark ? "#121212" : "#F4F4F8" },
              ]}
            >
              <Main /> 
            </View>
          </ThemeProvider>
        </PaperProvider>
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