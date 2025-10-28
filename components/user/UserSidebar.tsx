// components/user/UserSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Plus, Tag } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/components/user/usercontext';
import { useSidebar } from '@/components/ui/sidebar';

export function UserSidebar() {
  const { user, logout, getUserStore } = useUser();
  const store = getUserStore();
  const { state } = useSidebar();
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();
  const isCollapsed = state === 'collapsed';

  const handleLogout = () => {
    logout();
    toast({ title: 'Logged out' });
    router.push('/user/login');
  };

  return (
    <Sidebar className={isCollapsed ? 'w-14' : 'w-60'}>
      <SidebarContent>
        <div className="p-4">
          {!isCollapsed && <h2 className="text-xl font-bold text-primary">DEALHUB</h2>}
          {isCollapsed && <div className="h-5 w-5 rounded bg-primary/20" />}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>User Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {store ? (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      {!isCollapsed && <span>{store.name}</span>}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/user/dashboard" className={pathname === '/user/dashboard' ? 'bg-muted font-medium' : ''}>
                      <Plus className="h-4 w-4" />
                      {!isCollapsed && <span>Add Store</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}