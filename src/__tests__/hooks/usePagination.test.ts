import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePagination } from '@/hooks/usePagination';

describe('usePagination', () => {
  const items = Array.from({ length: 25 }, (_, i) => i + 1);

  it('returns the first page of items', () => {
    const { result } = renderHook(() =>
      usePagination({ items, itemsPerPage: 10 })
    );

    expect(result.current.currentPage).toBe(1);
    expect(result.current.paginatedItems).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('calculates total pages correctly', () => {
    const { result } = renderHook(() =>
      usePagination({ items, itemsPerPage: 10 })
    );

    expect(result.current.totalPages).toBe(3);
  });

  it('navigates to next page', () => {
    const { result } = renderHook(() =>
      usePagination({ items, itemsPerPage: 10 })
    );

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedItems).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  it('navigates to previous page', () => {
    const { result } = renderHook(() =>
      usePagination({ items, itemsPerPage: 10 })
    );

    act(() => {
      result.current.goToPage(3);
    });

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.currentPage).toBe(2);
  });

  it('goes to specific page', () => {
    const { result } = renderHook(() =>
      usePagination({ items, itemsPerPage: 10 })
    );

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.paginatedItems).toEqual([21, 22, 23, 24, 25]);
  });

  it('clamps page number to valid range', () => {
    const { result } = renderHook(() =>
      usePagination({ items, itemsPerPage: 10 })
    );

    act(() => {
      result.current.goToPage(100);
    });

    expect(result.current.currentPage).toBe(3);

    act(() => {
      result.current.goToPage(-5);
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('has correct hasNextPage and hasPrevPage values', () => {
    const { result } = renderHook(() =>
      usePagination({ items, itemsPerPage: 10 })
    );

    expect(result.current.hasPrevPage).toBe(false);
    expect(result.current.hasNextPage).toBe(true);

    act(() => {
      result.current.goToPage(2);
    });

    expect(result.current.hasPrevPage).toBe(true);
    expect(result.current.hasNextPage).toBe(true);

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.hasPrevPage).toBe(true);
    expect(result.current.hasNextPage).toBe(false);
  });
});
