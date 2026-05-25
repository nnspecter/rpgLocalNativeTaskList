import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Achievement, allAchievements } from "./allAchievements";



interface AchievementsStore {
  achievements: Achievement[],
  setActive: (id: number) => void
  setOpen: (id: number) => void
  
}

export const useAchievementsStore = create<AchievementsStore>()(
  persist(
    (set) => ({
      achievements: allAchievements,
      //Изменить активное состояние
      setActive: (id: number) => {
        set((state) => {
          const target = state.achievements.find((a) => a.id === id);
          if (!target || !target.isOpen) return {};

          // Если пытаемся включить, но уже 2 активных — не даём
          if (!target.isActive) {
            const activeCount = state.achievements.filter((a) => a.isActive).length;
            if (activeCount >= 2) return {};
          }

          return {
            achievements: state.achievements.map((achievement) =>
              achievement.id === id
                ? { ...achievement, isActive: !achievement.isActive }
                : achievement
            ),
          };
        });
      },
      //Открытие ачивки
      setOpen: (id: number) => {
        (set)((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === id 
            ? {
                ...achievement,
                isOpen: true
              }
            : achievement
          ),
        }));
      },

    }),
    {
      name: "achievements-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);