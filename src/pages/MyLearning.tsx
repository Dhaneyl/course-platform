import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, ProgressBar } from '@/components/common';
import { CourseGrid } from '@/components/courses';
import { useCourses } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';

export function MyLearning() {
  const { user } = useAuth();
  const { courses, enrollments } = useCourses();

  const userEnrollments = useMemo(() => {
    if (!user) return [];
    return enrollments.filter((e) => e.studentId === user.id);
  }, [enrollments, user]);

  const enrolledCourses = useMemo(() => {
    return userEnrollments
      .map((enrollment) => {
        const course = courses.find((c) => c.id === enrollment.courseId);
        return course ? { course, enrollment } : null;
      })
      .filter((item): item is { course: typeof courses[0]; enrollment: typeof enrollments[0] } => item !== null);
  }, [userEnrollments, courses]);

  const inProgressCourses = enrolledCourses.filter(
    (item) => item.enrollment.progress > 0 && item.enrollment.progress < 100
  );

  const completedCourses = enrolledCourses.filter(
    (item) => item.enrollment.progress === 100
  );

  if (enrolledCourses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <svg
            className="mx-auto h-16 w-16 text-stone-400 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-stone-900 dark:text-white">
            No courses yet
          </h2>
          <p className="mt-2 text-stone-600 dark:text-gray-300">
            Start your learning journey by enrolling in a course
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
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white">
          My Learning
        </h1>
        <p className="mt-2 text-stone-600 dark:text-gray-300">
          Track your progress and continue learning
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-stone-200/80 dark:border-gray-700 p-6 shadow-sm ring-1 ring-stone-900/5 dark:ring-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900 dark:text-white">
                {enrolledCourses.length}
              </p>
              <p className="text-sm text-stone-500 dark:text-gray-400">
                Enrolled Courses
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-stone-200/80 dark:border-gray-700 p-6 shadow-sm ring-1 ring-stone-900/5 dark:ring-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-amber-600 dark:text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900 dark:text-white">
                {inProgressCourses.length}
              </p>
              <p className="text-sm text-stone-500 dark:text-gray-400">In Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-stone-200/80 dark:border-gray-700 p-6 shadow-sm ring-1 ring-stone-900/5 dark:ring-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-emerald-600 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900 dark:text-white">
                {completedCourses.length}
              </p>
              <p className="text-sm text-stone-500 dark:text-gray-400">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      {inProgressCourses.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-6">
            Continue Learning
          </h2>
          <div className="grid gap-4">
            {inProgressCourses.slice(0, 3).map(({ course, enrollment }) => (
              <Link
                key={course.id}
                to={`/courses/${course.slug}`}
                className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 rounded-2xl border border-stone-200/80 dark:border-gray-700 p-4 hover:shadow-lg hover:shadow-primary-500/10 transition-all ring-1 ring-stone-900/5 dark:ring-white/10"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full sm:w-48 h-32 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-stone-900 dark:text-white">
                    {course.title}
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-gray-400 mt-1">
                    {course.instructor.name}
                  </p>
                  <div className="mt-4">
                    <ProgressBar value={enrollment.progress} size="sm" />
                    <p className="text-sm text-stone-600 dark:text-gray-400 mt-2">
                      {enrollment.progress}% complete •{' '}
                      {enrollment.completedLessons.length}/{course.lessonsCount} lessons
                    </p>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                  <Button size="sm">Continue</Button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Enrolled Courses */}
      <section>
        <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-6">
          All Enrolled Courses
        </h2>
        <CourseGrid
          courses={enrolledCourses.map((item) => item.course)}
          showProgress
          emptyMessage="You haven't enrolled in any courses yet"
        />
      </section>

      {/* Completed Courses with Certificates */}
      {completedCourses.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-6">
            Completed Courses
          </h2>
          <div className="grid gap-4">
            {completedCourses.map(({ course }) => (
              <div
                key={course.id}
                className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-emerald-50 to-teal-50/50 dark:from-green-900/20 dark:to-green-900/10 rounded-2xl border border-emerald-200 dark:border-green-800 p-4 ring-1 ring-emerald-200/50 dark:ring-green-800/50"
              >
                <div className="w-12 h-12 bg-emerald-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-emerald-600 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold text-stone-900 dark:text-white">
                    {course.title}
                  </h3>
                  <p className="text-sm text-emerald-600 dark:text-green-400">
                    Completed! Certificate available
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Certificate
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
