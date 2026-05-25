import { useAchievementsStore } from '@/entities/Achievements';
import { useMetricsStore } from '@/entities/metrics';
import { useCharacterStore } from '@/entities/character';
import { checkAchievements } from '../model/checkAchievements';

beforeEach(() => {
  useAchievementsStore.setState({
    achievements: [
      { id: 1, name: 'First Step', boost: 1, desc: 'Complete first task', isOpen: false, isActive: false },
      { id: 2, name: 'Task Hunter', boost: 3, desc: 'Complete 20 tasks', isOpen: false, isActive: false },
      { id: 3, name: 'Iron Focus', boost: 4, desc: 'Finish 6 hour task', isOpen: false, isActive: false },
      { id: 4, name: 'Week Streak', boost: 4, desc: '7 days without break', isOpen: false, isActive: false },
      { id: 5, name: 'Unstoppable', boost: 7, desc: '30 day streak reached', isOpen: false, isActive: false },
      { id: 6, name: 'Legend', boost: 10, desc: '100 day streak completed', isOpen: false, isActive: false },
      { id: 7, name: 'Daily Hero', boost: 4, desc: 'Complete 5 tasks daily', isOpen: false, isActive: false },
      { id: 8, name: 'Master', boost: 10, desc: '100 level!', isOpen: false, isActive: false },
    ],
  });

  useMetricsStore.setState({
    streak: 0,
    streakDate: null,
    completedTasks: 0,
    todayUpdate: false,
    todayCompletedTasks: 0,
    maxTaskMinutes: 0,
  });

  useCharacterStore.setState({
    characterName: 'Test',
    experience: 0,
    maxExperience: 100,
    level: 0,
  });
});

describe('checkAchievements', () => {
  it('should unlock First Step when completedTasks >= 1', () => {
    useMetricsStore.setState({ completedTasks: 1 });
    checkAchievements();
    const achievement = useAchievementsStore.getState().achievements.find((a) => a.id === 1);
    expect(achievement?.isOpen).toBe(true);
  });

  it('should unlock Task Hunter when completedTasks >= 20', () => {
    useMetricsStore.setState({ completedTasks: 20 });
    checkAchievements();
    expect(
      useAchievementsStore.getState().achievements.find((a) => a.id === 2)?.isOpen
    ).toBe(true);
  });

  it('should unlock Iron Focus when maxTaskMinutes >= 360', () => {
    useMetricsStore.setState({ maxTaskMinutes: 360 });
    checkAchievements();
    expect(
      useAchievementsStore.getState().achievements.find((a) => a.id === 3)?.isOpen
    ).toBe(true);
  });

  it('should not unlock Iron Focus when maxTaskMinutes < 360', () => {
    useMetricsStore.setState({ maxTaskMinutes: 300 });
    checkAchievements();
    expect(
      useAchievementsStore.getState().achievements.find((a) => a.id === 3)?.isOpen
    ).toBe(false);
  });

  it('should unlock Week Streak when streak >= 7', () => {
    useMetricsStore.setState({ streak: 7 });
    checkAchievements();
    expect(
      useAchievementsStore.getState().achievements.find((a) => a.id === 4)?.isOpen
    ).toBe(true);
  });

  it('should unlock Unstoppable when streak >= 30', () => {
    useMetricsStore.setState({ streak: 30 });
    checkAchievements();
    expect(
      useAchievementsStore.getState().achievements.find((a) => a.id === 5)?.isOpen
    ).toBe(true);
  });

  it('should unlock Legend when streak >= 100', () => {
    useMetricsStore.setState({ streak: 100 });
    checkAchievements();
    expect(
      useAchievementsStore.getState().achievements.find((a) => a.id === 6)?.isOpen
    ).toBe(true);
  });

  it('should unlock Daily Hero when todayCompletedTasks >= 5', () => {
    useMetricsStore.setState({ todayCompletedTasks: 5 });
    checkAchievements();
    expect(
      useAchievementsStore.getState().achievements.find((a) => a.id === 7)?.isOpen
    ).toBe(true);
  });

  it('should unlock Master when level >= 100', () => {
    useCharacterStore.setState({ level: 100 });
    checkAchievements();
    expect(
      useAchievementsStore.getState().achievements.find((a) => a.id === 8)?.isOpen
    ).toBe(true);
  });

  it('should not unlock achievements that are already open', () => {
    useAchievementsStore.setState({
      achievements: useAchievementsStore.getState().achievements.map((a) =>
        a.id === 1 ? { ...a, isOpen: true } : a
      ),
    });
    const setOpenSpy = jest.spyOn(
      useAchievementsStore.getState(),
      'setOpen'
    );
    useMetricsStore.setState({ completedTasks: 1 });
    checkAchievements();
    expect(setOpenSpy).not.toHaveBeenCalled();
  });

  it('should use progressive check (>=) not strict equality', () => {
    useMetricsStore.setState({ completedTasks: 50, streak: 14 });
    checkAchievements();
    const achievements = useAchievementsStore.getState().achievements;
    expect(achievements.find((a) => a.id === 1)?.isOpen).toBe(true);
    expect(achievements.find((a) => a.id === 2)?.isOpen).toBe(true);
    expect(achievements.find((a) => a.id === 4)?.isOpen).toBe(true);
  });
});
