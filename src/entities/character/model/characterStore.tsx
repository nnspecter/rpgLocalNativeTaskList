import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserStore {
  characterName: string;
  experience: number;
  maxExperience: number;
  level: number;
  setCharacterName: (newName: string) => void;
  setExperience: (exp: number) => void;
}

export const useCharacterStore = create<UserStore>()(
  persist(
    (set) => ({
      characterName: "Character",
      experience: 0,
      maxExperience: 100,
      level: 0,
      setCharacterName: (newName: string) => set({ characterName: newName }),
      setExperience: (exp: number) => {
        set((state) => {
          let newExp = state.experience + exp;
          let newLevel = state.level;
          let newMaxExp = state.maxExperience;

          if (newExp >= newMaxExp) {
            newLevel += 1;
            newExp -= newMaxExp;
            newMaxExp = Math.round(newMaxExp * 1.2);
          }

          return {
            experience: newExp,
            level: newLevel,
            maxExperience: newMaxExp,
          };
        });
      },
    }),
    {
      name: "character-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);