// components/user/usercontext.tsx
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface User {
  id: string;
  name: string;
  storeId?: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (name: string, password: string) => boolean;
  logout: () => void;
  getUserStore: () => any | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const DUMMY_USERS = [
  { id: 'u1', name: 'john', password: '123', storeId: '1' },
  { id: 'u2', name: 'jane', password: '123', storeId: '2' },
  { id: 'u3', name: 'mike', password: '123' },
];

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('user_session');
      if (saved) {
        const userData = JSON.parse(saved);
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to load user session:', error);
      localStorage.removeItem('user_session');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      try {
        const saved = localStorage.getItem('user_session');
        if (saved) {
          setUser(JSON.parse(saved));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to sync user session:', error);
      }
    };
    window.addEventListener('user_session_updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('user_session_updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const login = (name: string, password: string) => {
    const found = DUMMY_USERS.find(
      u => u.name.toLowerCase() === name.toLowerCase() && u.password === password
    );
    if (!found) return false;

    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('user_session', JSON.stringify(safeUser));

    // SAVE DUMMY TOKEN
    const dummyToken = btoa(JSON.stringify({ id: safeUser.id, role: 'user' }));
    localStorage.setItem('userToken', dummyToken);

    window.dispatchEvent(new Event('user_session_updated'));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
    localStorage.removeItem('userToken'); // ← ALSO REMOVE TOKEN
    window.dispatchEvent(new Event('user_session_updated'));
  };

  const getUserStore = () => {
    if (!user?.storeId) return null;
    try {
      const stores = JSON.parse(localStorage.getItem('admin_stores') || '[]');
      return stores.find((s: any) => s.id === user.storeId);
    } catch (error) {
      console.error('Failed to get user store:', error);
      return null;
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout, getUserStore }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};