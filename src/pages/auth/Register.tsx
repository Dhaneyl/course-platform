import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common';
import { useAuth } from '@/contexts/AuthContext';

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(name, email, password);
      if (success) {
        navigate('/', { replace: true });
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-stone-900 dark:text-white">
              LearnHub
            </span>
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-stone-900 dark:text-white">
            Create your account
          </h1>
          <p className="mt-2 text-stone-600 dark:text-gray-300">
            Start learning from the best instructors
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-stone-200/50 dark:shadow-black/20 border border-stone-200/80 dark:border-gray-700 p-8 ring-1 ring-stone-900/5 dark:ring-white/10">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-gray-600 bg-stone-50 dark:bg-gray-700 text-stone-900 dark:text-gray-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 focus:bg-white transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-gray-600 bg-stone-50 dark:bg-gray-700 text-stone-900 dark:text-gray-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 focus:bg-white transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-gray-600 bg-stone-50 dark:bg-gray-700 text-stone-900 dark:text-gray-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 focus:bg-white transition-all"
                placeholder="At least 6 characters"
              />
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-xs text-center text-stone-500 dark:text-gray-400">
            By signing up, you agree to our{' '}
            <a href="#" className="text-primary-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>

        <p className="mt-6 text-center text-stone-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
