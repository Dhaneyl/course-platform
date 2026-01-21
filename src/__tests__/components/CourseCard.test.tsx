import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CourseCard } from '@/components/courses/CourseCard';
import { AuthProvider } from '@/contexts/AuthContext';
import { CourseProvider } from '@/contexts/CourseContext';
import type { Course } from '@/types';

const mockCourse: Course = {
  id: 'course-1',
  title: 'Test Course',
  slug: 'test-course',
  description: 'A test course description',
  thumbnail: 'https://example.com/image.jpg',
  instructor: {
    id: 'inst-1',
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
    bio: 'Test instructor',
    coursesCount: 5,
    studentsCount: 1000,
    rating: 4.5,
  },
  category: 'web-development',
  level: 'beginner',
  price: 49.99,
  duration: 120,
  lessonsCount: 10,
  rating: 4.5,
  reviewsCount: 100,
  enrolledCount: 500,
  modules: [],
  whatYouWillLearn: [],
  createdAt: new Date().toISOString(),
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      <CourseProvider>{children}</CourseProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('CourseCard', () => {
  it('renders course title', () => {
    render(<CourseCard course={mockCourse} />, { wrapper });
    expect(screen.getByText('Test Course')).toBeInTheDocument();
  });

  it('renders instructor name', () => {
    render(<CourseCard course={mockCourse} />, { wrapper });
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders price', () => {
    render(<CourseCard course={mockCourse} />, { wrapper });
    expect(screen.getByText('$49.99')).toBeInTheDocument();
  });

  it('renders FREE badge for free courses', () => {
    const freeCourse = { ...mockCourse, price: 0 };
    render(<CourseCard course={freeCourse} />, { wrapper });
    expect(screen.getByText('FREE')).toBeInTheDocument();
  });

  it('renders level badge', () => {
    render(<CourseCard course={mockCourse} />, { wrapper });
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  it('renders duration', () => {
    render(<CourseCard course={mockCourse} />, { wrapper });
    expect(screen.getByText('2h')).toBeInTheDocument();
  });

  it('renders lessons count', () => {
    render(<CourseCard course={mockCourse} />, { wrapper });
    expect(screen.getByText('10 lessons')).toBeInTheDocument();
  });

  it('links to course detail page', () => {
    render(<CourseCard course={mockCourse} />, { wrapper });
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/courses/test-course');
  });

  it('has favorite button', () => {
    render(<CourseCard course={mockCourse} />, { wrapper });
    const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
    expect(favoriteButton).toBeInTheDocument();
  });
});
