import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Rating, Badge } from '@/components/common';
import { LessonList, CourseCard } from '@/components/courses';
import { getCourseBySlug, getReviewsByCourseId, courses } from '@/services/mockData';
import { formatDuration, formatPrice, formatRelativeDate } from '@/utils/formatters';
import { getLevelColor, getLevelLabel, getCategoryLabel } from '@/utils/helpers';
import { useCourses } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';

export function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { enrollInCourse, isEnrolled, getEnrollment } = useCourses();
  const { isFavorite, toggleFavorite } = useFavorites();

  const course = getCourseBySlug(slug || '');

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Course not found
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          The course you're looking for doesn't exist.
        </p>
        <Link to="/courses" className="mt-4 inline-block">
          <Button>Browse Courses</Button>
        </Link>
      </div>
    );
  }

  const reviews = getReviewsByCourseId(course.id);
  const enrolled = isEnrolled(course.id);
  const enrollment = getEnrollment(course.id);
  const relatedCourses = courses
    .filter((c) => c.category === course.category && c.id !== course.id)
    .slice(0, 4);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/courses/${slug}` } });
      return;
    }
    enrollInCourse(course.id);
  };

  const handleStartLearning = () => {
    const firstLesson = course.modules[0]?.lessons[0];
    if (firstLesson) {
      navigate(`/lesson/${course.slug}/${firstLesson.id}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 dark:from-gray-900 dark:via-gray-900 dark:to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <Link
                  to={`/courses?category=${course.category}`}
                  className="text-primary-400 hover:text-primary-300 text-sm"
                >
                  {getCategoryLabel(course.category)}
                </Link>
                <span className="text-gray-500">•</span>
                <Badge className={getLevelColor(course.level)}>
                  {getLevelLabel(course.level)}
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{course.title}</h1>

              <p className="text-lg text-gray-300 mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Rating value={course.rating} size="sm" />
                  <span className="font-medium">{course.rating.toFixed(1)}</span>
                  <span className="text-gray-400">
                    ({course.reviewsCount.toLocaleString()} reviews)
                  </span>
                </div>
                <span className="text-gray-400">
                  {course.enrolledCount.toLocaleString()} students enrolled
                </span>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">Created by {course.instructor.name}</p>
                  <p className="text-sm text-gray-400">
                    {course.instructor.coursesCount} courses •{' '}
                    {course.instructor.studentsCount.toLocaleString()} students
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {formatDuration(course.duration)} total
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {course.lessonsCount} lessons
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  {course.modules.length} modules
                </div>
              </div>
            </div>

            {/* Sidebar Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl ring-1 ring-white/10 overflow-hidden sticky top-24">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-stone-900 dark:text-white">
                      {formatPrice(course.price)}
                    </span>
                    <button
                      onClick={() => toggleFavorite(course.id)}
                      className="p-2 hover:bg-stone-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      aria-label={
                        isFavorite(course.id) ? 'Remove from favorites' : 'Add to favorites'
                      }
                    >
                      <svg
                        className={`w-6 h-6 ${
                          isFavorite(course.id)
                            ? 'text-red-500 fill-current'
                            : 'text-gray-400'
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
                  </div>

                  {enrolled ? (
                    <div className="space-y-3">
                      <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-lg text-center text-sm font-medium">
                        You're enrolled! {enrollment?.progress}% complete
                      </div>
                      <Button onClick={handleStartLearning} className="w-full" size="lg">
                        Continue Learning
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={handleEnroll} className="w-full" size="lg">
                      {course.price === 0 ? 'Enroll for Free' : 'Enroll Now'}
                    </Button>
                  )}

                  <div className="mt-6 space-y-3 text-sm text-stone-600 dark:text-gray-300">
                    <p className="font-medium text-stone-900 dark:text-white">
                      This course includes:
                    </p>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      {formatDuration(course.duration)} on-demand video
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      {course.lessonsCount} lessons
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Full lifetime access
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>
                      Certificate of completion
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* What You'll Learn */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6">
                What You'll Learn
              </h2>
              <div className="bg-gradient-to-br from-primary-50 to-teal-50/50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 ring-1 ring-primary-200/50 dark:ring-gray-700">
                <ul className="grid sm:grid-cols-2 gap-4">
                  {course.whatYouWillLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-stone-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Course Content */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6">
                Course Content
              </h2>
              <LessonList modules={course.modules} isEnrolled={enrolled} />
            </section>

            {/* Instructor */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6">
                Instructor
              </h2>
              <div className="flex items-start gap-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-24 h-24 rounded-full ring-4 ring-stone-100 dark:ring-gray-700"
                />
                <div>
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-white">
                    {course.instructor.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-stone-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Rating value={course.instructor.rating} size="sm" />
                      <span>{course.instructor.rating} rating</span>
                    </div>
                    <span>{course.instructor.studentsCount.toLocaleString()} students</span>
                    <span>{course.instructor.coursesCount} courses</span>
                  </div>
                  <p className="mt-3 text-stone-600 dark:text-gray-300">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6">
                Student Reviews
              </h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl border border-stone-200/80 dark:border-gray-700 p-6 shadow-sm ring-1 ring-stone-900/5 dark:ring-white/10"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={review.studentAvatar}
                        alt={review.studentName}
                        className="w-12 h-12 rounded-full ring-2 ring-stone-100 dark:ring-gray-700"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-stone-900 dark:text-white">
                            {review.studentName}
                          </h4>
                          <span className="text-sm text-stone-500 dark:text-gray-400">
                            {formatRelativeDate(review.createdAt)}
                          </span>
                        </div>
                        <Rating value={review.rating} size="sm" className="mt-1" />
                        <p className="mt-3 text-stone-600 dark:text-gray-300">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6">
              Related Courses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCourses.map((relatedCourse) => (
                <CourseCard key={relatedCourse.id} course={relatedCourse} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
