import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/common';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-stone-200/80 dark:border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-stone-900 dark:text-white">
              LearnHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/courses"
              className="px-4 py-2 text-stone-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-stone-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
            >
              Courses
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/my-learning"
                  className="px-4 py-2 text-stone-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-stone-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
                >
                  My Learning
                </Link>
                <Link
                  to="/favorites"
                  className="px-4 py-2 text-stone-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-stone-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
                >
                  Favorites
                </Link>
              </>
            )}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-gray-700 bg-stone-50 dark:bg-gray-800 text-stone-900 dark:text-gray-100 placeholder-stone-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-stone-500 dark:text-gray-400 hover:text-stone-700 dark:hover:text-gray-200 hover:bg-stone-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            {/* Auth Buttons / User Menu */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/my-learning"
                    className="flex items-center gap-2 text-stone-700 dark:text-gray-300 p-1"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full ring-2 ring-stone-200 dark:ring-gray-700"
                    />
                  </Link>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="shadow-md shadow-primary-500/25">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2.5 text-stone-500 dark:text-gray-400 hover:text-stone-700 dark:hover:text-gray-200 hover:bg-stone-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </nav>
  );
}
