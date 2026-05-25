import { useAchievementsStore } from "@/entities/Achievements";
import { useCharacterStore } from "@/entities/character";
import { useMetricsStore } from "@/entities/metrics";

type Check = {
  current: number;
  value: number;
  achievementId: number;
};

export const checkAchievements = () => {
  const { achievements, setOpen } = useAchievementsStore.getState();
  const metrics = useMetricsStore.getState();
  const { level } = useCharacterStore.getState();

  const checks: Check[] = [
    { current: metrics.completedTasks, value: 1, achievementId: 1 },
    { current: metrics.completedTasks, value: 20, achievementId: 2 },
    { current: metrics.maxTaskMinutes, value: 360, achievementId: 3 },
    { current: metrics.streak, value: 7, achievementId: 4 },
    { current: metrics.streak, value: 30, achievementId: 5 },
    { current: metrics.streak, value: 100, achievementId: 6 },
    { current: metrics.todayCompletedTasks, value: 5, achievementId: 7 },
    { current: level, value: 100, achievementId: 8 },
  ];

  checks.forEach(({ current, value, achievementId }) => {
    const achievement = achievements.find((a) => a.id === achievementId);
    if (achievement && !achievement.isOpen && current >= value) {
      setOpen(achievementId);
    }
  });
};
