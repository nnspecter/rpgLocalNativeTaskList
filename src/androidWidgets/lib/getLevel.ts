import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getLevel(): Promise<{ level: number }> {
  try {
    const raw = await AsyncStorage.getItem('character-storage');
    if (!raw) return { level: 0 };

    const parsed = JSON.parse(raw);
    const state = parsed?.state;

    return {
      level: state?.level ?? 0,
    };
  } catch {
    return { level: 0 };
  }
}