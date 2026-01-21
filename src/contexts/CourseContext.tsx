import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { Course, Enrollment } from '@/types';
import { courses as mockCourses } from '@/services/mockData';
import { useAuth } from './AuthContext';

interface CourseContextType {
  courses: Course[];
  enrollments: Enrollment[];
  enrollInCourse: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  getEnrollment: (courseId: string) => Enrollment | undefined;
  completeLesson: (courseId: string, lessonId: string) => void;
  getProgress: (courseId: string) => number;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const ENROLLMENTS_KEY = 'course-platform-enrollments';

export function CourseProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [courses] = useState<Course[]>(mockCourses);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(ENROLLMENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const saveEnrollments = useCallback((newEnrollments: Enrollment[]) => {
    setEnrollments(newEnrollments);
    localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(newEnrollments));
  }, []);

  const enrollInCourse = useCallback(
    (courseId: string) => {
      if (!user) return;

      const existingEnrollment = enrollments.find(
        (e) => e.courseId === courseId && e.studentId === user.id
      );

      if (existingEnrollment) return;

      const newEnrollment: Enrollment = {
        id: `enrollment-${Date.now()}`,
        courseId,
        studentId: user.id,
        progress: 0,
        completedLessons: [],
        enrolledAt: new Date().toISOString(),
        completedAt: null,
      };

      saveEnrollments([...enrollments, newEnrollment]);
    },
    [user, enrollments, saveEnrollments]
  );

  const isEnrolled = useCallback(
    (courseId: string) => {
      if (!user) return false;
      return enrollments.some(
        (e) => e.courseId === courseId && e.studentId === user.id
      );
    },
    [user, enrollments]
  );

  const getEnrollment = useCallback(
    (courseId: string) => {
      if (!user) return undefined;
      return enrollments.find(
        (e) => e.courseId === courseId && e.studentId === user.id
      );
    },
    [user, enrollments]
  );

  const completeLesson = useCallback(
    (courseId: string, lessonId: string) => {
      if (!user) return;

      const enrollment = enrollments.find(
        (e) => e.courseId === courseId && e.studentId === user.id
      );

      if (!enrollment) return;
      if (enrollment.completedLessons.includes(lessonId)) return;

      const course = courses.find((c) => c.id === courseId);
      if (!course) return;

      const updatedCompletedLessons = [...enrollment.completedLessons, lessonId];
      const totalLessons = course.lessonsCount;
      const newProgress = Math.round(
        (updatedCompletedLessons.length / totalLessons) * 100
      );

      const updatedEnrollment: Enrollment = {
        ...enrollment,
        completedLessons: updatedCompletedLessons,
        progress: newProgress,
        completedAt: newProgress === 100 ? new Date().toISOString() : null,
      };

      const updatedEnrollments = enrollments.map((e) =>
        e.id === enrollment.id ? updatedEnrollment : e
      );

      saveEnrollments(updatedEnrollments);
    },
    [user, enrollments, courses, saveEnrollments]
  );

  const getProgress = useCallback(
    (courseId: string) => {
      const enrollment = getEnrollment(courseId);
      return enrollment?.progress ?? 0;
    },
    [getEnrollment]
  );

  return (
    <CourseContext.Provider
      value={{
        courses,
        enrollments,
        enrollInCourse,
        isEnrolled,
        getEnrollment,
        completeLesson,
        getProgress,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
}
