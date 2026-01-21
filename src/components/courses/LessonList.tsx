import { useState } from 'react';
import type { Module, Lesson } from '@/types';
import { formatDuration } from '@/utils/formatters';

interface LessonListProps {
  modules: Module[];
  completedLessons?: string[];
  currentLessonId?: string;
  onLessonSelect?: (lesson: Lesson) => void;
  isEnrolled?: boolean;
}

export function LessonList({
  modules,
  completedLessons = [],
  currentLessonId,
  onLessonSelect,
  isEnrolled = false,
}: LessonListProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>(
    modules.length > 0 ? [modules[0].id] : []
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const isLessonAccessible = (lesson: Lesson) => {
    return isEnrolled || lesson.isPreview;
  };

  return (
    <div className="space-y-2">
      {modules.map((module, moduleIndex) => {
        const isExpanded = expandedModules.includes(module.id);
        const completedInModule = module.lessons.filter((l) =>
          completedLessons.includes(l.id)
        ).length;
        const totalDuration = module.lessons.reduce((acc, l) => acc + l.duration, 0);

        return (
          <div
            key={module.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-sm font-medium">
                  {moduleIndex + 1}
                </span>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {module.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {completedInModule}/{module.lessons.length} lessons •{' '}
                    {formatDuration(totalDuration)}
                  </p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isExpanded && (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {module.lessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isCurrent = lesson.id === currentLessonId;
                  const isAccessible = isLessonAccessible(lesson);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => isAccessible && onLessonSelect?.(lesson)}
                      disabled={!isAccessible}
                      className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                        isCurrent
                          ? 'bg-primary-50 dark:bg-primary-900/20'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      } ${!isAccessible ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? 'bg-primary-600 text-white'
                            : isCurrent
                            ? 'border-2 border-primary-600'
                            : 'border-2 border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        {isCompleted && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm ${
                              isCurrent
                                ? 'font-medium text-primary-600 dark:text-primary-400'
                                : 'text-gray-900 dark:text-gray-100'
                            }`}
                          >
                            {lesson.title}
                          </span>
                          {lesson.isPreview && !isEnrolled && (
                            <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded">
                              Preview
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDuration(lesson.duration)}
                        </span>
                      </div>

                      {!isAccessible && (
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
