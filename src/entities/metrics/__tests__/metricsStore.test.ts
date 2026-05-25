import { useMetricsStore } from '../model/metricsStore';

// Use a fixed date for predictable tests
const TODAY = '2026-05-25';
const YESTERDAY = '2026-05-24';

beforeEach(() => {
  jest.useFakeTimers({ now: new Date(TODAY + 'T12:00:00Z') });

  useMetricsStore.setState({
    streak: 0,
    streakDate: null,
    completedTasks: 0,
    todayUpdate: false,
    todayCompletedTasks: 0,
    maxTaskMinutes: 0,
  });
});

afterEach(() => {
  jest.useRealTimers();
});

describe('updateCompletedCount', () => {
  it('should increment completedTasks by 1', () => {
    useMetricsStore.getState().updateCompletedCount();
    expect(useMetricsStore.getState().completedTasks).toBe(1);
  });

  it('should increment multiple times', () => {
    useMetricsStore.getState().updateCompletedCount();
    useMetricsStore.getState().updateCompletedCount();
    useMetricsStore.getState().updateCompletedCount();
    expect(useMetricsStore.getState().completedTasks).toBe(3);
  });
});

describe('updateTodayCompletedTasks', () => {
  it('should increment todayCompletedTasks', () => {
    useMetricsStore.getState().updateTodayCompletedTasks(10);
    expect(useMetricsStore.getState().todayCompletedTasks).toBe(1);
  });

  it('should update maxTaskMinutes', () => {
    useMetricsStore.getState().updateTodayCompletedTasks(45);
    expect(useMetricsStore.getState().maxTaskMinutes).toBe(45);
  });

  it('should keep the max value', () => {
    useMetricsStore.getState().updateTodayCompletedTasks(30);
    useMetricsStore.getState().updateTodayCompletedTasks(60);
    useMetricsStore.getState().updateTodayCompletedTasks(15);
    expect(useMetricsStore.getState().maxTaskMinutes).toBe(60);
  });
});

describe('updateStreak', () => {
  it('should start streak at 1 with no previous streak', () => {
    useMetricsStore.getState().updateStreak();
    const state = useMetricsStore.getState();
    expect(state.streak).toBe(1);
    expect(state.streakDate).toBe(TODAY);
    expect(state.todayUpdate).toBe(true);
  });

  it('should increment streak if last update was yesterday', () => {
    useMetricsStore.setState({ streak: 1, streakDate: YESTERDAY });
    useMetricsStore.getState().updateStreak();
    expect(useMetricsStore.getState().streak).toBe(2);
    expect(useMetricsStore.getState().streakDate).toBe(TODAY);
  });

  it('should keep same streak if already updated today', () => {
    useMetricsStore.setState({ streak: 5, streakDate: TODAY });
    useMetricsStore.getState().updateStreak();
    expect(useMetricsStore.getState().streak).toBe(5);
  });
});

describe('checkAndResetStreak', () => {
  it('should do nothing if no streakDate', () => {
    useMetricsStore.setState({ streak: 10, streakDate: null });
    useMetricsStore.getState().checkAndResetStreak();
    const state = useMetricsStore.getState();
    expect(state.streak).toBe(10);
    expect(state.streakDate).toBeNull();
  });

  it('should reset streak if date is older than yesterday', () => {
    const twoDaysAgo = '2026-05-23';
    useMetricsStore.setState({ streak: 10, streakDate: twoDaysAgo, todayCompletedTasks: 3 });
    useMetricsStore.getState().checkAndResetStreak();
    const state = useMetricsStore.getState();
    expect(state.streak).toBe(0);
    expect(state.streakDate).toBeNull();
    expect(state.todayCompletedTasks).toBe(0);
  });

  it('should keep streak if date is yesterday', () => {
    useMetricsStore.setState({ streak: 5, streakDate: YESTERDAY });
    useMetricsStore.getState().checkAndResetStreak();
    expect(useMetricsStore.getState().streak).toBe(5);
  });

  it('should keep streak if date is today', () => {
    useMetricsStore.setState({ streak: 5, streakDate: TODAY });
    useMetricsStore.getState().checkAndResetStreak();
    expect(useMetricsStore.getState().streak).toBe(5);
  });
});
