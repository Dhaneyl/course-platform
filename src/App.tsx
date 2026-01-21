import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CourseProvider } from '@/contexts/CourseContext';
import { MainLayout } from '@/components/layout';
import { Spinner } from '@/components/common';

// Lazy load pages for better performance
const Landing = lazy(() => import('@/pages/Landing').then((m) => ({ default: m.Landing })));
const Courses = lazy(() => import('@/pages/Courses').then((m) => ({ default: m.Courses })));
const CourseDetail = lazy(() => import('@/pages/CourseDetail').then((m) => ({ default: m.CourseDetail })));
const MyLearning = lazy(() => import('@/pages/MyLearning').then((m) => ({ default: m.MyLearning })));
const Lesson = lazy(() => import('@/pages/Lesson').then((m) => ({ default: m.Lesson })));
const Favorites = lazy(() => import('@/pages/Favorites').then((m) => ({ default: m.Favorites })));
const Login = lazy(() => import('@/pages/auth/Login').then((m) => ({ default: m.Login })));
const Register = lazy(() => import('@/pages/auth/Register').then((m) => ({ default: m.Register })));

function LoadingSpinner() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Landing />
            </Suspense>
          }
        />
        <Route
          path="/courses"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Courses />
            </Suspense>
          }
        />
        <Route
          path="/courses/:slug"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <CourseDetail />
            </Suspense>
          }
        />
        <Route
          path="/my-learning"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <MyLearning />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <Favorites />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Register />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/lesson/:slug/:lessonId"
        element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <Lesson />
            </Suspense>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CourseProvider>
            <AppRoutes />
          </CourseProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
