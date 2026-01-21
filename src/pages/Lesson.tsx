import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, ProgressBar } from '@/components/common';
import { VideoPlayer, LessonList } from '@/components/courses';
import { getCourseBySlug } from '@/services/mockData';
import { useCourses } from '@/contexts/CourseContext';
import { formatDuration } from '@/utils/formatters';
import type { Lesson as LessonType } from '@/types';

export function Lesson() {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const navigate = useNavigate();
  const { isEnrolled, getEnrollment, completeLesson } = useCourses();

  const course = getCourseBySlug(slug || '');

  const allLessons = useMemo(() => {
    if (!course) return [];
    return course.modules.flatMap((m) => m.lessons);
  }, [course]);

  const currentLesson = useMemo(() => {
    return allLessons.find((l) => l.id === lessonId) || allLessons[0];
  }, [allLessons, lessonId]);

  const currentLessonIndex = allLessons.findIndex((l) => l.id === currentLesson?.id);
  const nextLesson = allLessons[currentLessonIndex + 1];
  const prevLesson = allLessons[currentLessonIndex - 1];

  const enrollment = course ? getEnrollment(course.id) : undefined;
  const enrolled = course ? isEnrolled(course.id) : false;

  const [showSidebar, setShowSidebar] = useState(true);

  if (!course || !currentLesson) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Lesson not found
        </h1>
        <Link to="/courses" className="mt-4 inline-block">
          <Button>Browse Courses</Button>
        </Link>
      </div>
    );
  }

  if (!enrolled) {
    navigate(`/courses/${slug}`);
    return null;
  }

  const handleLessonSelect = (lesson: LessonType) => {
    navigate(`/lesson/${slug}/${lesson.id}`);
  };

  const handleCompleteLesson = () => {
    completeLesson(course.id, currentLesson.id);
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      handleCompleteLesson();
      navigate(`/lesson/${slug}/${nextLesson.id}`);
    }
  };

  const isLessonCompleted = enrollment?.completedLessons.includes(currentLesson.id);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to={`/courses/${slug}`}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
          <div>
            <h1 className="font-medium line-clamp-1">{course.title}</h1>
            <p className="text-sm text-gray-400">
              Lesson {currentLessonIndex + 1} of {allLessons.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <ProgressBar value={enrollment?.progress || 0} size="sm" className="w-32" />
            <span className="text-sm text-gray-400">{enrollment?.progress || 0}%</span>
          </div>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 ${showSidebar ? 'lg:mr-80' : ''}`}>
          {/* Video Player */}
          <div className="bg-black">
            <div className="max-w-5xl mx-auto">
              <VideoPlayer
                thumbnail={course.thumbnail}
                title={currentLesson.title}
                onComplete={handleCompleteLesson}
              />
            </div>
          </div>

          {/* Lesson Content */}
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentLesson.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Duration: {formatDuration(currentLesson.duration)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {isLessonCompleted ? (
                  <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Completed
                  </span>
                ) : (
                  <Button variant="outline" onClick={handleCompleteLesson}>
                    Mark as Complete
                  </Button>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between py-6 border-t border-gray-200 dark:border-gray-700">
              <div>
                {prevLesson && (
                  <button
                    onClick={() => navigate(`/lesson/${slug}/${prevLesson.id}`)}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span className="text-sm">Previous Lesson</span>
                  </button>
                )}
              </div>

              <div>
                {nextLesson ? (
                  <Button onClick={handleNextLesson}>
                    Next Lesson
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button>
                ) : (
                  <Link to={`/courses/${slug}`}>
                    <Button>Finish Course</Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Lesson Description */}
            <div className="prose dark:prose-invert max-w-none mt-8">
              <h3>About this lesson</h3>
              <p>
                In this lesson, you'll learn key concepts and techniques that will help you
                advance your skills. Watch the video above and make sure to practice the
                concepts covered.
              </p>
              <h4>Key takeaways:</h4>
              <ul>
                <li>Understanding the core concepts</li>
                <li>Practical application examples</li>
                <li>Best practices and tips</li>
                <li>Common pitfalls to avoid</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <div className="hidden lg:block fixed right-0 top-[57px] bottom-0 w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Course Content
              </h3>
              <LessonList
                modules={course.modules}
                completedLessons={enrollment?.completedLessons || []}
                currentLessonId={currentLesson.id}
                onLessonSelect={handleLessonSelect}
                isEnrolled
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
