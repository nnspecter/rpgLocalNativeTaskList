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
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            (achievement.id === id && achievement.isOpen)
              ? {
                  ...achievement,
                  isActive: !achievement.isActive,
                }
              : achievement
          ),
        }));
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