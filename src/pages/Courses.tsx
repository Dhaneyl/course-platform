import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CourseGrid } from '@/components/courses';
import { Button } from '@/components/common';
import { filterCourses, categoryNames, categories, levels } from '@/services/mockData';
import { usePagination } from '@/hooks/usePagination';
import { useDebounce } from '@/hooks/useDebounce';
import { getLevelLabel } from '@/utils/helpers';
import type { Category, Level } from '@/types';

const ITEMS_PER_PAGE = 12;

export function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [level, setLevel] = useState(searchParams.get('level') || 'all');
  const [price, setPrice] = useState(searchParams.get('price') || 'all');
  const [minRating, setMinRating] = useState(
    Number(searchParams.get('rating')) || 0
  );
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const filteredCourses = useMemo(
    () => filterCourses(debouncedSearch, category, level, price, minRating),
    [debouncedSearch, category, level, price, minRating]
  );

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination({ items: filteredCourses, itemsPerPage: ITEMS_PER_PAGE });

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (category !== 'all') params.set('category', category);
    if (level !== 'all') params.set('level', level);
    if (price !== 'all') params.set('price', price);
    if (minRating > 0) params.set('rating', String(minRating));
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, category, level, price, minRating, setSearchParams]);

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setLevel('all');
    setPrice('all');
    setMinRating(0);
  };

  const hasActiveFilters =
    search || category !== 'all' || level !== 'all' || price !== 'all' || minRating > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white">
          Browse Courses
        </h1>
        <p className="mt-2 text-stone-600 dark:text-gray-300">
          Discover {filteredCourses.length} courses to help you grow
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 dark:border-gray-600 bg-stone-50 dark:bg-gray-800 text-stone-900 dark:text-gray-100 placeholder-stone-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 focus:bg-white transition-all"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filter Toggle (Mobile) */}
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside
          className={`lg:w-64 flex-shrink-0 ${
            showFilters ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-stone-200/80 dark:border-gray-700 p-6 sticky top-24 shadow-sm ring-1 ring-stone-900/5 dark:ring-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-stone-900 dark:text-white">Filters</h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-gray-600 bg-stone-50 dark:bg-gray-700 text-stone-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 focus:bg-white transition-all"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {categoryNames[cat as Category]}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2">
                Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-gray-600 bg-stone-50 dark:bg-gray-700 text-stone-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 focus:bg-white transition-all"
              >
                <option value="all">All Levels</option>
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {getLevelLabel(lvl as Level)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2">
                Price
              </label>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'free', label: 'Free' },
                  { value: 'paid', label: 'Paid' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value={option.value}
                      checked={price === option.value}
                      onChange={(e) => setPrice(e.target.value)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-stone-300 dark:border-gray-600"
                    />
                    <span className="ml-2 text-stone-700 dark:text-gray-300">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2">
                Minimum Rating
              </label>
              <div className="space-y-2">
                {[0, 3, 3.5, 4, 4.5].map((rating) => (
                  <label key={rating} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={minRating === rating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-stone-300 dark:border-gray-600"
                    />
                    <span className="ml-2 text-stone-700 dark:text-gray-300">
                      {rating === 0 ? 'Any' : `${rating}+ stars`}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Course Grid */}
        <div className="flex-1">
          <CourseGrid courses={paginatedItems} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={!hasPrevPage}
              >
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    if (totalPages <= 7) return true;
                    if (page === 1 || page === totalPages) return true;
                    if (Math.abs(page - currentPage) <= 1) return true;
                    return false;
                  })
                  .map((page, index, arr) => {
                    const prevPage = arr[index - 1];
                    const showEllipsis = prevPage && page - prevPage > 1;

                    return (
                      <span key={page} className="flex items-center">
                        {showEllipsis && (
                          <span className="px-2 text-stone-500">...</span>
                        )}
                        <button
                          onClick={() => goToPage(page)}
                          className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                            page === currentPage
                              ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25'
                              : 'text-stone-700 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          {page}
                        </button>
                      </span>
                    );
                  })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={!hasNextPage}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
