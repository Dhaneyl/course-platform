import { Link } from 'react-router-dom';
import { Button, Rating } from '@/components/common';
import { CourseCard } from '@/components/courses';
import { courses, testimonials, categoryNames, categories } from '@/services/mockData';
import { getCategoryIcon } from '@/utils/helpers';
import type { Category } from '@/types';

export function Landing() {
  const featuredCourses = courses.slice(0, 4);

  const stats = [
    { label: 'Students', value: '50,000+' },
    { label: 'Courses', value: '30+' },
    { label: 'Instructors', value: '5' },
    { label: 'Hours of Content', value: '500+' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-amber-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-gradient-to-br from-primary-200/40 to-primary-300/20 rounded-full blur-3xl dark:from-primary-900/20 dark:to-primary-800/10" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-gradient-to-tr from-amber-200/30 to-orange-200/20 rounded-full blur-3xl dark:from-amber-900/10 dark:to-orange-900/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                New courses added weekly
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-white leading-tight">
                Learn New Skills{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-500">Online</span> From Experts
              </h1>
              <p className="mt-6 text-lg text-stone-600 dark:text-gray-300 max-w-lg">
                Join thousands of students already learning on LearnHub. Access
                world-class courses from industry experts and advance your career.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/courses">
                  <Button size="lg" className="shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-shadow">
                    Browse Courses
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg">
                    Get Started Free
                  </Button>
                </Link>
              </div>
              <div className="mt-12 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <img
                      key={i}
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                      alt=""
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Rating value={4.8} size="sm" />
                    <span className="text-sm font-medium text-stone-900 dark:text-white">
                      4.8
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 dark:text-gray-400">
                    From 10,000+ reviews
                  </p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop"
                  alt="Students learning"
                  className="rounded-2xl shadow-2xl shadow-stone-900/10 dark:shadow-black/30 ring-1 ring-stone-900/5 dark:ring-white/10"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl shadow-stone-900/10 dark:shadow-black/30 p-4 z-20 ring-1 ring-stone-900/5 dark:ring-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary-600 dark:text-primary-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-white">
                      30+ Courses
                    </p>
                    <p className="text-sm text-stone-500 dark:text-gray-400">
                      From beginner to advanced
                    </p>
                  </div>
                </div>
              </div>
              {/* Second floating card */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl shadow-stone-900/10 dark:shadow-black/30 p-3 z-20 ring-1 ring-stone-900/5 dark:ring-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900 dark:text-white">4.9 Rating</p>
                    <p className="text-xs text-stone-500 dark:text-gray-400">Top rated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-500 to-teal-500 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2di00aC0ydjRoMnptMC02di00aC0ydjRoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-primary-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 dark:text-white">
              Explore Categories
            </h2>
            <p className="mt-4 text-lg text-stone-600 dark:text-gray-300">
              Choose from a wide range of topics to advance your skills
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/courses?category=${category}`}
                className="flex flex-col items-center p-6 bg-stone-50 dark:bg-gray-800 rounded-xl hover:bg-gradient-to-br hover:from-primary-50 hover:to-teal-50 dark:hover:from-primary-900/20 dark:hover:to-teal-900/20 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 group ring-1 ring-stone-900/5 dark:ring-white/10 hover:ring-primary-500/20"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-full flex items-center justify-center group-hover:from-primary-200 group-hover:to-primary-300 dark:group-hover:from-primary-800 dark:group-hover:to-primary-700 transition-colors shadow-sm">
                  <svg
                    className="w-7 h-7 text-primary-600 dark:text-primary-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={getCategoryIcon(category)} />
                  </svg>
                </div>
                <span className="mt-3 text-sm font-medium text-stone-900 dark:text-white text-center">
                  {categoryNames[category as Category]}
                </span>
                <span className="mt-1 text-xs text-stone-500 dark:text-gray-400">
                  {courses.filter((c) => c.category === category).length} courses
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-stone-50 to-stone-100/50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 dark:text-white">
                Featured Courses
              </h2>
              <p className="mt-2 text-lg text-stone-600 dark:text-gray-300">
                Hand-picked courses to help you get started
              </p>
            </div>
            <Link to="/courses">
              <Button variant="outline">View All Courses</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 dark:text-white">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-stone-600 dark:text-gray-300">
              Join thousands of satisfied learners who have transformed their careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`relative bg-gradient-to-br ${
                  index === 0
                    ? 'from-primary-50 to-teal-50 dark:from-primary-900/20 dark:to-teal-900/20'
                    : index === 1
                    ? 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20'
                    : 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'
                } rounded-2xl p-6 ring-1 ring-stone-900/5 dark:ring-white/10`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-stone-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full ring-2 ring-white dark:ring-gray-800 shadow-sm"
                  />
                  <div>
                    <p className="font-medium text-stone-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-stone-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-600 via-primary-500 to-teal-500 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Start Learning?
          </h2>
          <p className="mt-4 text-lg text-primary-100">
            Join LearnHub today and get access to thousands of courses from expert
            instructors.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-stone-50 shadow-xl shadow-primary-900/20"
              >
                Get Started for Free
              </Button>
            </Link>
            <Link to="/courses">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
