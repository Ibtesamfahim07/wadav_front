// components/admin/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, User, FolderOpen, Tags, MessageSquare } from 'lucide-react';
import {
  LayoutDashboard,
  Tag,
  Store,
  FolderTree,
  FileText,
  Settings,
  LogOut,
  Menu,
  Home,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useSidebar } from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation';

const mainMenuItems = [
  { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Main Page', url: '/admin/main-page', icon: Home },
  { title: 'Coupons', url: '/admin/coupons', icon: Tag },
  { title: 'Stores', url: '/admin/stores', icon: Store },
  { title: 'Categories', url: '/admin/categories', icon: FolderTree },
  { title: 'Users', url: '/admin/users', icon: Users },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

const blogMenuItems = [
  { title: 'Blog Posts', url: '/admin/blog-posts', icon: FileText },
  { title: 'Authors', url: '/admin/blog-authors', icon: User },
  { title: 'Categories', url: '/admin/blog-categories', icon: FolderOpen },
  { title: 'Tags', url: '/admin/blog-tags', icon: Tags },
  { title: 'Comments', url: '/admin/blog-comments', icon: MessageSquare }, // ← NEW
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();
  const isCollapsed = state === 'collapsed';

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_token');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
    router.push('/admin/login');
  };

  return (
    <Sidebar className={isCollapsed ? 'w-14' : 'w-60'}>
      <SidebarContent>
        <div className="p-4">
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-primary">DEALHUB</h2>
          )}
          {isCollapsed && (
            <Menu className="h-5 w-5 text-primary" />
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={pathname === item.url
                        ? 'bg-muted text-primary font-medium'
                        : 'hover:bg-muted/50'}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Blog Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {blogMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={pathname === item.url
                        ? 'bg-muted text-primary font-medium'
                        : 'hover:bg-muted/50'}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}