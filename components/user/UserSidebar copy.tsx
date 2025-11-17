// components/user/UserSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Plus, Tag, Store } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/components/user/usercontext';
import { useSidebar } from '@/components/ui/sidebar';

export function UserSidebar() {
  const { user, logout, getUserStore } = useUser();
  const store = getUserStore();               // <-- real store from DB
  const { state } = useSidebar();
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();
  const isCollapsed = state === 'collapsed';

  const handleLogout = () => {
    logout();
    toast({ title: 'Logged out successfully', description: 'See you again soon!' });
    router.push('/user/login');
  };

  return (
    <Sidebar className={isCollapsed ? 'w-14' : 'w-60'}>
      <SidebarContent>
        {/* Logo/Brand */}
        <div className="p-4 border-b">
          {!isCollapsed ? (
            <div>
              <h2 className="text-xl font-bold text-primary">DEALHUB</h2>
              <p className="text-xs text-muted-foreground mt-1">User Panel</p>
            </div>
          ) : (
            <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center">
              <Store className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>

        {/* User Info */}
        {user && !isCollapsed && (
          <div className="p-4 border-b bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {store?.name ?? 'No store'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/user/dashboard'}
                >
                  <Link href="/user/dashboard">
                    {store ? (
                      <>
                        <Tag className="h-4 w-4" />
                        {!isCollapsed && <span>My Coupons</span>}
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        {!isCollapsed && <span>Add Store</span>}
                      </>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Show store name when it exists */}
              {store && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center gap-2 cursor-default">
                      <Store className="h-4 w-4" />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground">Store</p>
                          <p className="text-sm font-medium truncate">{store.name}</p>
                        </div>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout Button */}
      <SidebarFooter className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}