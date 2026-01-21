import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '@/hooks/useFavorites';

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('adds a favorite', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite('course-1');
    });

    expect(result.current.favorites).toContain('course-1');
  });

  it('does not add duplicate favorites', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite('course-1');
      result.current.addFavorite('course-1');
    });

    expect(result.current.favorites.filter((id) => id === 'course-1').length).toBe(1);
  });

  it('removes a favorite', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite('course-1');
      result.current.addFavorite('course-2');
    });

    act(() => {
      result.current.removeFavorite('course-1');
    });

    expect(result.current.favorites).not.toContain('course-1');
    expect(result.current.favorites).toContain('course-2');
  });

  it('toggles favorite on and off', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite('course-1');
    });

    expect(result.current.favorites).toContain('course-1');

    act(() => {
      result.current.toggleFavorite('course-1');
    });

    expect(result.current.favorites).not.toContain('course-1');
  });

  it('checks if course is favorite', () => {
    const { result } = renderHook(() => useFavorites());

    expect(result.current.isFavorite('course-1')).toBe(false);

    act(() => {
      result.current.addFavorite('course-1');
    });

    expect(result.current.isFavorite('course-1')).toBe(true);
    expect(result.current.isFavorite('course-2')).toBe(false);
  });

  it('persists favorites to localStorage', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite('course-1');
    });

    const stored = localStorage.getItem('course-platform-favorites');
    expect(stored).toBe('["course-1"]');
  });

  it('loads favorites from localStorage', () => {
    localStorage.setItem('course-platform-favorites', '["course-1","course-2"]');

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual(['course-1', 'course-2']);
  });
});
