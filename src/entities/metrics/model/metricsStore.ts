import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toDateString } from "@/shared/config/DateFormatters/DateFormatter";

interface UserStore {
  streak: number;
  streakDate: string | null;
  completedTasks: number;
  todayUpdate: boolean;
  todayCompletedTasks: number;
  maxTaskMinutes: number;
  checkAndResetStreak: () => void;
  updateStreak: () => void;
  updateCompletedCount: () => void;
  updateTodayCompletedTasks: (minutes: number) => void;
}

export const useMetricsStore = create<UserStore>()(
  persist(
    (set) => ({
      streak: 0,
      streakDate: null,
      completedTasks: 0,
      todayUpdate: false,
      todayCompletedTasks: 0,
      maxTaskMinutes: 0,
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
            return { streak: 0, streakDate: null, todayUpdate: false, todayCompletedTasks: 0 };
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
            return { todayUpdate: true };
          }

          const yesterday = toDateString(
            new Date(Date.now() - 24 * 60 * 60 * 1000)
          );

          if (state.streakDate === yesterday) {
            return { streak: state.streak + 1, streakDate: today, todayUpdate: true, todayCompletedTasks: 1 };
          }

          return { streak: 1, streakDate: today, todayUpdate: true, todayCompletedTasks: 1 };
        });
      },
      // Обновление счетчика выполненных (+1)
      updateCompletedCount: () => {
        set((state) => ({
          completedTasks: state.completedTasks + 1,
        }));
      },
      // Обновление счетчика выполненных за сегодня (+1) и макс. времени задачи
      updateTodayCompletedTasks: (minutes: number) => {
        set((state) => ({
          todayCompletedTasks: state.todayCompletedTasks + 1,
          maxTaskMinutes: Math.max(state.maxTaskMinutes, minutes),
        }));
      },
    }),

    {
      name: "metricsStore-storage2",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);