import { expValidation } from '../expValidation';

describe('expValidation', () => {
  it('returns base exp when no active achievements', () => {
    expect(expValidation(10, 0)).toBe(30);
  });

  it('applies boost percentage from active achievements', () => {
    const totalBoost = 1;
    const baseExp = 10 * 3;
    const expected = Math.round(baseExp + (baseExp * totalBoost) / 100);
    expect(expValidation(10, totalBoost)).toBe(expected);
  });

  it('calculates correct exp for 25 minutes', () => {
    const baseExp = 25 * 3;
    const totalBoost = 1;
    const expected = Math.round(baseExp + (baseExp * totalBoost) / 100);
    expect(expValidation(25, totalBoost)).toBe(expected);
  });

  it('handles multiple active achievements with cumulative boost', () => {
    const totalBoost = 1 + 4; // First Step + Week Streak
    const baseExp = 60 * 3;
    const expected = Math.round(baseExp + (baseExp * totalBoost) / 100);
    expect(expValidation(60, totalBoost)).toBe(expected);
  });

  it('returns base exp for time = 0', () => {
    expect(expValidation(0, 0)).toBe(0);
  });
});
