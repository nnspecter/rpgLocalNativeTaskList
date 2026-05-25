import { getTodayDate, toDateString } from '../DateFormatter';

describe('getTodayDate', () => {
  it('returns today date in ISO format (YYYY-MM-DD)', () => {
    const result = getTodayDate();
    const expected = new Date().toISOString().split('T')[0];
    expect(result).toBe(expected);
  });

  it('matches YYYY-MM-DD pattern', () => {
    const result = getTodayDate();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('toDateString', () => {
  it('formats date correctly', () => {
    const date = new Date(2025, 0, 15); // Jan 15, 2025
    expect(toDateString(date)).toBe('2025-01-15');
  });

  it('pads single digit month and day', () => {
    const date = new Date(2025, 2, 5); // Mar 5, 2025
    expect(toDateString(date)).toBe('2025-03-05');
  });

  it('handles end of year', () => {
    const date = new Date(2025, 11, 31); // Dec 31, 2025
    expect(toDateString(date)).toBe('2025-12-31');
  });

  it('handles start of year', () => {
    const date = new Date(2026, 0, 1); // Jan 1, 2026
    expect(toDateString(date)).toBe('2026-01-01');
  });
});
