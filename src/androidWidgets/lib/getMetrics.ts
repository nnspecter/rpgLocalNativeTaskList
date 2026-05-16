import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getMetrics(): Promise<{ streak: number; todayUpdate: boolean }> {
  try {
    const raw = await AsyncStorage.getItem('metricsStore-storage2');
    if (!raw) return { streak: 0, todayUpdate: false };

    const parsed = JSON.parse(raw);
    const state = parsed?.state;

    return {
      streak: state?.streak ?? 0,
      todayUpdate: state?.todayUpdate ?? false,
    };
  } catch {
    return { streak: 0, todayUpdate: false };
  }
}