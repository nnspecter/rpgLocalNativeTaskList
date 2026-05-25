import { useAchievementsStore } from "@/entities/Achievements"

export const expValidation = (time: number): number => {
    const AchievementsStore = useAchievementsStore.getState();
    const activeAchievements = AchievementsStore.achievements.filter((el) => el.isActive)
    const totalBoost = activeAchievements.reduce((sum, achievement) => sum + achievement.boost, 0);

    const baseExp = time * 3;

    const totalExp = Math.round(baseExp + (baseExp * totalBoost) / 100);
    return totalExp
}