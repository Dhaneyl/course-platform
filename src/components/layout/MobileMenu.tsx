import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/common';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {isAuthenticated && (
            <div className="flex items-center gap-3 p-3 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
          )}

          <Link
            to="/courses"
            onClick={onClose}
            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Browse Courses
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/my-learning"
                onClick={onClose}
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                My Learning
              </Link>
              <Link
                to="/favorites"
                onClick={onClose}
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Favorites
              </Link>
              <hr className="my-4 border-gray-200 dark:border-gray-800" />
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-4 space-y-3">
              <Link to="/login" onClick={onClose} className="block">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/register" onClick={onClose} className="block">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
