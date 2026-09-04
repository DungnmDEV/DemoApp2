import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockApi } from '../api/mockApi';

interface AuthUser {
  id: string;
  username: string;
  type: 'guest' | 'user';
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await mockApi.getCurrentSession();
        if (session) {
          setUser(session);
        } else {
          // Auto guest session if no user
          // const guest = await mockApi.getGuestSession();
          // setUser({ id: guest.id!, username: 'Guest', type: 'guest' });
        }
      } catch (error) {
        console.error('Failed to init auth', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Listen for global unauthorized events from ApiService
    const handleUnauthorized = () => {
      setUser(null);
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await mockApi.login(username, password);
      if (response.status && response.id) {
        setUser({ id: response.id, username, type: 'user' });
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await mockApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
