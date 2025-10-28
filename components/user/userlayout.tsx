// app/user/layout.tsx
import { UserProvider } from '@/components/user/usercontext';
import { ReactNode } from 'react';

export default function UserLayout({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}