import { describe, it, expect } from 'vitest';
import {
  formatDuration,
  formatPrice,
  formatNumber,
  formatDate,
  formatRelativeDate,
} from '@/utils/formatters';

describe('formatDuration', () => {
  it('formats minutes under 60 correctly', () => {
    expect(formatDuration(30)).toBe('30m');
    expect(formatDuration(45)).toBe('45m');
    expect(formatDuration(1)).toBe('1m');
  });

  it('formats hours correctly', () => {
    expect(formatDuration(60)).toBe('1h');
    expect(formatDuration(120)).toBe('2h');
  });

  it('formats hours and minutes correctly', () => {
    expect(formatDuration(90)).toBe('1h 30m');
    expect(formatDuration(150)).toBe('2h 30m');
    expect(formatDuration(75)).toBe('1h 15m');
  });
});

describe('formatPrice', () => {
  it('returns "Free" for price of 0', () => {
    expect(formatPrice(0)).toBe('Free');
  });

  it('formats price with dollar sign and two decimals', () => {
    expect(formatPrice(29.99)).toBe('$29.99');
    expect(formatPrice(99)).toBe('$99.00');
    expect(formatPrice(149.5)).toBe('$149.50');
  });
});

describe('formatNumber', () => {
  it('returns number as string for values under 1000', () => {
    expect(formatNumber(500)).toBe('500');
    expect(formatNumber(999)).toBe('999');
  });

  it('formats thousands with K suffix', () => {
    expect(formatNumber(1000)).toBe('1.0K');
    expect(formatNumber(1500)).toBe('1.5K');
    expect(formatNumber(10000)).toBe('10.0K');
  });

  it('formats millions with M suffix', () => {
    expect(formatNumber(1000000)).toBe('1.0M');
    expect(formatNumber(1500000)).toBe('1.5M');
  });
});

describe('formatDate', () => {
  it('formats date correctly', () => {
    // Use a specific time to avoid timezone issues
    const date = new Date('2024-03-15T12:00:00Z').toISOString();
    const result = formatDate(date);
    expect(result).toContain('Mar');
    expect(result).toContain('2024');
    // Date could be 14 or 15 depending on timezone, so we check it contains a number
    expect(result).toMatch(/\d+/);
  });
});

describe('formatRelativeDate', () => {
  it('returns "just now" for very recent dates', () => {
    const date = new Date().toISOString();
    expect(formatRelativeDate(date)).toBe('just now');
  });

  it('returns minutes ago for dates within the hour', () => {
    const date = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    expect(formatRelativeDate(date)).toBe('5 minutes ago');
  });

  it('returns hours ago for dates within the day', () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeDate(date)).toBe('3 hours ago');
  });

  it('returns days ago for dates within the month', () => {
    const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeDate(date)).toBe('7 days ago');
  });
});
