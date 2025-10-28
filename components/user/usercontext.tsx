// components/user/UserContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  storeId?: string;
}

interface UserContextType {
  user: User | null;
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

  // Load user from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('user_session');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // Listen for user session updates (e.g. after adding store)
  useEffect(() => {
    const handler = () => {
      const saved = localStorage.getItem('user_session');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    };
    window.addEventListener('user_session_updated', handler);
    return () => window.removeEventListener('user_session_updated', handler);
  }, []);

  const login = (name: string, password: string) => {
    const found = DUMMY_USERS.find(
      u => u.name.toLowerCase() === name.toLowerCase() && u.password === password
    );
    if (found) {
      const { password, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem('user_session', JSON.stringify(safeUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
  };

  const getUserStore = () => {
    if (!user?.storeId) return null;
    const stores = JSON.parse(localStorage.getItem('admin_stores') || '[]');
    return stores.find((s: any) => s.id === user.storeId);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, getUserStore }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};