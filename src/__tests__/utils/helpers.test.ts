import { describe, it, expect } from 'vitest';
import {
  getLevelColor,
  getLevelLabel,
  getCategoryLabel,
  classNames,
  generateId,
  calculateProgress,
} from '@/utils/helpers';

describe('getLevelColor', () => {
  it('returns correct color class for beginner', () => {
    const result = getLevelColor('beginner');
    expect(result).toContain('green');
  });

  it('returns correct color class for intermediate', () => {
    const result = getLevelColor('intermediate');
    expect(result).toContain('yellow');
  });

  it('returns correct color class for advanced', () => {
    const result = getLevelColor('advanced');
    expect(result).toContain('red');
  });
});

describe('getLevelLabel', () => {
  it('capitalizes the first letter', () => {
    expect(getLevelLabel('beginner')).toBe('Beginner');
    expect(getLevelLabel('intermediate')).toBe('Intermediate');
    expect(getLevelLabel('advanced')).toBe('Advanced');
  });
});

describe('getCategoryLabel', () => {
  it('returns human-readable category labels', () => {
    expect(getCategoryLabel('web-development')).toBe('Web Development');
    expect(getCategoryLabel('data-science')).toBe('Data Science');
    expect(getCategoryLabel('ui-ux-design')).toBe('UI/UX Design');
    expect(getCategoryLabel('mobile-development')).toBe('Mobile Development');
    expect(getCategoryLabel('business')).toBe('Business');
    expect(getCategoryLabel('marketing')).toBe('Marketing');
  });
});

describe('classNames', () => {
  it('joins class names with spaces', () => {
    expect(classNames('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  it('filters out falsy values', () => {
    expect(classNames('foo', false, 'bar', undefined, 'baz')).toBe('foo bar baz');
  });

  it('handles boolean conditions', () => {
    const isActive = true;
    const isDisabled = false;
    expect(classNames('btn', isActive && 'active', isDisabled && 'disabled')).toBe(
      'btn active'
    );
  });
});

describe('generateId', () => {
  it('generates a string', () => {
    expect(typeof generateId()).toBe('string');
  });

  it('generates unique ids', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });
});

describe('calculateProgress', () => {
  it('returns 0 for no completed lessons', () => {
    expect(calculateProgress([], 10)).toBe(0);
  });

  it('returns 100 for all completed lessons', () => {
    expect(calculateProgress(['1', '2', '3'], 3)).toBe(100);
  });

  it('returns correct percentage', () => {
    expect(calculateProgress(['1', '2'], 4)).toBe(50);
    expect(calculateProgress(['1', '2', '3'], 10)).toBe(30);
  });

  it('handles zero total lessons', () => {
    expect(calculateProgress([], 0)).toBe(0);
  });
});
