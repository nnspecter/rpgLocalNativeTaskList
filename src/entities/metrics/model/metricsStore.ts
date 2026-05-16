import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toDateString } from "@/shared/config/DateFormatters/DateFormatter";

interface UserStore {
  streak: number;
  streakDate: string | null;
  completedTasks: number;
  todayUpdate: boolean;
  checkAndResetStreak: () => void;
  updateStreak: () => void;
  updateCompletedCount: () => void;
}

export const useMetricsStore = create<UserStore>()(
  persist(
    (set) => ({
      streak: 0,
      streakDate: null,
      completedTasks: 0,
      todayUpdate: false,
      //проверка и ресет стрика по дате последнего обновления
      checkAndResetStreak: () => {
        set((state) => {
          if (!state.streakDate) return {};

          const yesterday = toDateString(
            new Date(Date.now() - 24 * 60 * 60 * 1000)
          );
          const today = toDateString(new Date());

          // Сбрасываем если дата стрика старее вчерашнего дня
          const isStreakExpired =
            state.streakDate !== today && state.streakDate !== yesterday;

          if (isStreakExpired) {
            return { streak: 0, streakDate: null, todayUpdate: false };
          }

          return {};
        });
      },
      
      // Обновление стрика (+1)
      updateStreak: () => {
        set((state) => {
          const today = toDateString(new Date());

          if (!state.streakDate) {
            return { streak: 1, streakDate: today, todayUpdate: true };
          }

          if (state.streakDate === today) {
            return {};
          }

          const yesterday = toDateString(
            new Date(Date.now() - 24 * 60 * 60 * 1000)
          );

          if (state.streakDate === yesterday) {
            return { streak: state.streak + 1, streakDate: today, todayUpdate: true };
          }

          return { streak: 1, streakDate: today, todayUpdate: true };
        });
      },
      // Обновление счетчика выполненных (+1)
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