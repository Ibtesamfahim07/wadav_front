'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

interface User {
  id: string;
  name: string;
}

interface Store {
  id: string;
  name: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (name: string, password: string) => Promise<boolean>;
  logout: () => void;
  getUserStores: () => Store[] | null;
  refreshStore: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [stores, setStores] = useState<Store[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('user_session');
      if (saved) {
        const userData = JSON.parse(saved);
        setUser(userData);
      }
    } catch (e) {
      console.error('Failed to load user session:', e);
      localStorage.removeItem('user_session');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      try {
        const saved = localStorage.getItem('user_session');
        setUser(saved ? JSON.parse(saved) : null);
        if (saved) refreshStore();
      } catch (e) {
        console.error('Sync error:', e);
      }
    };
    window.addEventListener('user_session_updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('user_session_updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const login = async (name: string, password: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      const { token, userId } = data;
      const safeUser = { id: userId, name };
      setUser(safeUser);
      localStorage.setItem('user_session', JSON.stringify(safeUser));
      localStorage.setItem('userToken', token);

      window.dispatchEvent(new Event('user_session_updated'));
      await refreshStore();
      return true;
    } catch (e: any) {
      console.error(e);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setStores(null);
    localStorage.removeItem('user_session');
    localStorage.removeItem('userToken');
    window.dispatchEvent(new Event('user_session_updated'));
  };

  const fetchUserStores = async () => {
    if (!user) return null;
    const token = localStorage.getItem('userToken');
    if (!token) return null;

    try {
      const res = await fetch(`${BACKEND_URL}/api/user/me/store-name`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        console.warn('Store fetch failed:', data);
        return null;
      }

      return data.stores || null;
    } catch (error) {
      console.error('Store fetch error:', error);
      return null;
    }
  };

  const refreshStore = async () => {
    const fetched = await fetchUserStores();
    setStores(fetched);
  };

  useEffect(() => {
    if (user) refreshStore();
  }, [user]);

  const getUserStores = () => stores;

  return (
    <UserContext.Provider
      value={{ user, isLoading, login, logout, getUserStores, refreshStore }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};