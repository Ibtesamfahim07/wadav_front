// app/admin/layout.tsx
'use client';   // ← MUST BE HERE (at the top!)

import { AdminProvider } from '@/contexts/AdminContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = !pathname.endsWith('/login');

  return (
    <AdminProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          {showSidebar && <AdminSidebar />}
          <div className="flex-1 flex flex-col">
            {showSidebar && (
              <header className="h-14 border-b flex items-center px-4 bg-background">
                <SidebarTrigger />
                <h1 className="ml-4 text-lg font-semibold">Admin Panel</h1>
              </header>
            )}
            <main className="flex-1 p-6 bg-muted/20">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </AdminProvider>
  );
}