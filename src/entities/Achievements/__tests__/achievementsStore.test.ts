import { useAchievementsStore } from '../model/achievementsStore';

describe('achievementsStore', () => {
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

  it('should have 8 achievements', () => {
    const { achievements } = useAchievementsStore.getState();
    expect(achievements).toHaveLength(8);
  });

  describe('setOpen', () => {
    it('should unlock an achievement by id', () => {
      const { setOpen } = useAchievementsStore.getState();
      setOpen(2);
      const achievement = useAchievementsStore.getState().achievements.find((a) => a.id === 2);
      expect(achievement?.isOpen).toBe(true);
    });

    it('should not change other achievements', () => {
      useAchievementsStore.getState().setOpen(3);
      const achievements = useAchievementsStore.getState().achievements;
      expect(achievements.find((a) => a.id === 3)?.isOpen).toBe(true);
      expect(achievements.find((a) => a.id === 2)?.isOpen).toBe(false);
    });
  });

  describe('setActive', () => {
    it('should toggle active on an open achievement', () => {
      useAchievementsStore.getState().setActive(1);
      const achievement = useAchievementsStore.getState().achievements.find((a) => a.id === 1);
      expect(achievement?.isActive).toBe(false);
    });

    it('should not toggle on a locked achievement', () => {
      useAchievementsStore.getState().setActive(2);
      const achievement = useAchievementsStore.getState().achievements.find((a) => a.id === 2);
      expect(achievement?.isActive).toBe(false);
    });

    it('should allow activating up to 2 achievements', () => {
      useAchievementsStore.getState().setActive(1); // deactivate First Step first

      // open all achievements
      const openAll = useAchievementsStore.getState().achievements.map((a) => ({
        ...a,
        isOpen: true,
        isActive: false,
      }));
      useAchievementsStore.setState({ achievements: openAll });

      useAchievementsStore.getState().setActive(2);
      useAchievementsStore.getState().setActive(4);

      const state2 = useAchievementsStore.getState();
      const active2 = state2.achievements.filter((a) => a.isActive);
      expect(active2).toHaveLength(2);

      // should not allow a third
      useAchievementsStore.getState().setActive(5);
      const state3 = useAchievementsStore.getState();
      const active3 = state3.achievements.filter((a) => a.isActive);
      expect(active3).toHaveLength(2);
    });
  });
});
