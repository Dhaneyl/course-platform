import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common';
import { CourseGrid } from '@/components/courses';
import { useFavorites } from '@/hooks/useFavorites';
import { courses } from '@/services/mockData';

export function Favorites() {
  const { favorites } = useFavorites();

  const favoriteCourses = useMemo(() => {
    return courses.filter((course) => favorites.includes(course.id));
  }, [favorites]);

  if (favoriteCourses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            No favorites yet
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Save courses you're interested in to access them quickly later
          </p>
          <Link to="/courses" className="mt-6 inline-block">
            <Button size="lg">Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Favorites
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {favoriteCourses.length} course{favoriteCourses.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {/* Course Grid */}
      <CourseGrid courses={favoriteCourses} />
    </div>
  );
}
