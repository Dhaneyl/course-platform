export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  coursesCount: number;
  studentsCount: number;
  rating: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  videoUrl: string;
  isPreview: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export type Category =
  | 'web-development'
  | 'data-science'
  | 'ui-ux-design'
  | 'mobile-development'
  | 'business'
  | 'marketing';

export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  instructor: Instructor;
  category: Category;
  level: Level;
  price: number;
  duration: number;
  lessonsCount: number;
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  modules: Module[];
  whatYouWillLearn: string[];
  createdAt: string;
}

export interface Review {
  id: string;
  courseId: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  progress: number;
  completedLessons: string[];
  enrolledAt: string;
  completedAt: string | null;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrollments: string[];
  favorites: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  comment: string;
}

export interface FilterOptions {
  category: Category | 'all';
  level: Level | 'all';
  price: 'all' | 'free' | 'paid';
  rating: number;
  search: string;
}
