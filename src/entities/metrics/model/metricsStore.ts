import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toDateString } from  "@/shared/config/DateFormatters/DateFormatter";

interface UserStore {
  streak: number;
  streakDate: string | null;
  completedTasks: number;

  updateStreak: () => void;
  updateCompletedCount: () => void;
}



export const useMetricsStore = create<UserStore>()(
  persist(
    (set) => ({
      streak: 0,
      streakDate: null,
      completedTasks: 0,
      // Обновление стрика
      updateStreak: () => {
        set((state) => {
          const today = toDateString(new Date());

          if (!state.streakDate) {
            return { streak: 1, streakDate: today };
          }

          if (state.streakDate === today) {
            return {};
          }

          const yesterday = toDateString(
            new Date(Date.now() - 24 * 60 * 60 * 1000)
          );

          if (state.streakDate === yesterday) {
            return { streak: state.streak + 1, streakDate: today };
          }

          return { streak: 1, streakDate: today };
        });
      },
      // Обновление счетчика выполненных
      updateCompletedCount: () => {
        set((state) => ({
          completedTasks: state.completedTasks + 1,
        }));
      },
    }),

    {
      name: "metricsStore-storage2",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);