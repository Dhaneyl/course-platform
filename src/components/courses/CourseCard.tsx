import { Link } from 'react-router-dom';
import type { Course } from '@/types';
import { Rating, Badge, ProgressBar } from '@/components/common';
import { formatDuration, formatPrice } from '@/utils/formatters';
import { getLevelColor, getLevelLabel } from '@/utils/helpers';
import { useFavorites } from '@/hooks/useFavorites';
import { useCourses } from '@/contexts/CourseContext';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
}

export function CourseCard({ course, showProgress = false }: CourseCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { getProgress, isEnrolled } = useCourses();

  const progress = showProgress ? getProgress(course.id) : 0;
  const enrolled = isEnrolled(course.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(course.id);
  };

  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary-500/10 dark:hover:shadow-black/30 transition-all duration-300 overflow-hidden ring-1 ring-stone-900/5 dark:ring-white/10 hover:ring-primary-500/20 dark:hover:ring-primary-500/30"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/95 dark:bg-gray-900/95 rounded-full shadow-lg shadow-black/10 hover:bg-white dark:hover:bg-gray-900 transition-all hover:scale-110"
          aria-label={isFavorite(course.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className={`h-5 w-5 transition-colors ${
              isFavorite(course.id)
                ? 'text-red-500 fill-current'
                : 'text-stone-400 dark:text-gray-500 group-hover:text-stone-500'
            }`}
            fill={isFavorite(course.id) ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        {course.price === 0 && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-primary-600 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            FREE
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Badge className={getLevelColor(course.level)}>
            {getLevelLabel(course.level)}
          </Badge>
          <span className="text-xs text-stone-500 dark:text-gray-400 font-medium">
            {formatDuration(course.duration)}
          </span>
        </div>

        <h3 className="font-semibold text-stone-900 dark:text-gray-100 line-clamp-2 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug">
          {course.title}
        </h3>

        <p className="text-sm text-stone-500 dark:text-gray-400 mb-3">
          {course.instructor.name}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <Rating value={course.rating} size="sm" showValue />
          <span className="text-xs text-stone-400 dark:text-gray-500">
            ({course.reviewsCount.toLocaleString()})
          </span>
        </div>

        {showProgress && enrolled ? (
          <div className="mt-4 pt-4 border-t border-stone-100 dark:border-gray-700">
            <ProgressBar value={progress} showLabel size="sm" />
          </div>
        ) : (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100 dark:border-gray-700">
            <span className="text-lg font-bold text-stone-900 dark:text-gray-100">
              {formatPrice(course.price)}
            </span>
            <span className="text-xs text-stone-500 dark:text-gray-400 bg-stone-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {course.lessonsCount} lessons
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
