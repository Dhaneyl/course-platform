import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { Student } from '@/types';

interface AuthContextType {
  user: Student | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'course-platform-auth';

const mockUsers: Record<string, { password: string; user: Student }> = {
  'demo@example.com': {
    password: 'demo123',
    user: {
      id: 'student-demo',
      name: 'Demo User',
      email: 'demo@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
      enrollments: [],
      favorites: [],
    },
  },
};

function getInitialUser(): Student | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(AUTH_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem(AUTH_KEY);
    }
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Student | null>(getInitialUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [user]);

  const login = async (email: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser = mockUsers[email];
    if (mockUser) {
      setUser(mockUser.user);
      return true;
    }

    // Allow any email/password for demo purposes
    const newUser: Student = {
      id: `student-${Date.now()}`,
      name: email.split('@')[0],
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      enrollments: [],
      favorites: [],
    };
    setUser(newUser);
    return true;
  };

  const register = async (
    name: string,
    email: string
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser: Student = {
      id: `student-${Date.now()}`,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      enrollments: [],
      favorites: [],
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
