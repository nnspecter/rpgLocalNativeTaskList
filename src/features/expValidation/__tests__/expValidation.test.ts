import { expValidation } from '../expValidation';
import { useAchievementsStore } from '@/entities/Achievements';

beforeEach(() => {
  useAchievementsStore.setState({
    achievements: [
      { id: 1, name: 'First Step', boost: 1, desc: 'Complete first task', isOpen: true, isActive: true },
      { id: 2, name: 'Task Hunter', boost: 3, desc: 'Complete 20 tasks', isOpen: false, isActive: false },
      { id: 3, name: 'Iron Focus', boost: 4, desc: 'Finish 6 hour task', isOpen: false, isActive: false },
      { id: 4, name: 'Week Streak', boost: 4, desc: '7 days without break', isOpen: false, isActive: false },
      { id: 5, name: 'Unstoppable', boost: 7, desc: '30 day streak reached', isOpen: false, isActive: false },
      { id: 6, name: 'Legend', boost: 10, desc: '100 day streak completed', isOpen: false, isActive: false },
      { id: 7, name: 'Daily Hero', boost: 4, desc: 'Complete 5 tasks daily', isOpen: false, isActive: false },
      { id: 8, name: 'Master', boost: 10, desc: '100 level!', isOpen: false, isActive: false },
    ],
  });
});

describe('expValidation', () => {
  it('returns base exp when no active achievements', () => {
    useAchievementsStore.setState({
      achievements: useAchievementsStore.getState().achievements.map((a) => ({
        ...a,
        isActive: false,
      })),
    });
    expect(expValidation(10)).toBe(30);
  });

  it('applies boost percentage from active achievements', () => {
    const totalBoost = 1; // only First Step active
    const baseExp = 10 * 3;
    const expected = Math.round(baseExp + (baseExp * totalBoost) / 100);
    expect(expValidation(10)).toBe(expected);
  });

  it('calculates correct exp for 25 minutes', () => {
    const baseExp = 25 * 3;
    const totalBoost = 1;
    const expected = Math.round(baseExp + (baseExp * totalBoost) / 100);
    expect(expValidation(25)).toBe(expected);
  });

  it('handles multiple active achievements with cumulative boost', () => {
    useAchievementsStore.setState({
      achievements: useAchievementsStore.getState().achievements.map((a) => ({
        ...a,
        isActive: a.id === 1 || a.id === 4,
      })),
    });
    const totalBoost = 1 + 4; // First Step + Week Streak
    const baseExp = 60 * 3;
    const expected = Math.round(baseExp + (baseExp * totalBoost) / 100);
    expect(expValidation(60)).toBe(expected);
  });

  it('returns base exp for time = 0', () => {
    useAchievementsStore.setState({
      achievements: useAchievementsStore.getState().achievements.map((a) => ({
        ...a,
        isActive: false,
      })),
    });
    expect(expValidation(0)).toBe(0);
  });
});
