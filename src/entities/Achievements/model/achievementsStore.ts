import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Achievement, allAchievements } from "./allAchievements";



interface AchievementsStore {
  achievements: Achievement[],
  totalBoost: number,
  setActive: (id: number) => void,
  setOpen: (id: number) => void
}

export const useAchievementsStore = create<AchievementsStore>()(
  persist(
    (set) => ({
      achievements: allAchievements,
      
      //высчитываем при первом обращении 
      totalBoost: allAchievements
        .filter((a) => a.isActive)
        .reduce((sum, a) => sum + a.boost, 0),

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
          const achievements = state.achievements.map((achievement) =>
              achievement.id === id
                ? { ...achievement, isActive: !achievement.isActive }
                : achievement
            );
          const activeAchievements = achievements.filter((el) => el.isActive)
          const totalBoost = activeAchievements.reduce((sum, achievement) => sum + achievement.boost, 0);
          return {
            achievements,
            totalBoost
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