import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'course-platform-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = useCallback((courseId: string) => {
    setFavorites((prev) => {
      if (prev.includes(courseId)) return prev;
      return [...prev, courseId];
    });
  }, []);

  const removeFavorite = useCallback((courseId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== courseId));
  }, []);

  const toggleFavorite = useCallback((courseId: string) => {
    setFavorites((prev) => {
      if (prev.includes(courseId)) {
        return prev.filter((id) => id !== courseId);
      }
      return [...prev, courseId];
    });
  }, []);

  const isFavorite = useCallback(
    (courseId: string) => favorites.includes(courseId),
    [favorites]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}
