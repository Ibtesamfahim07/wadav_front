'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdmin } from '@/contexts/AdminContext';
import { Tag, Store, FileText, TrendingUp } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const { coupons, stores, blogPosts, getCouponAnalytics } = useAdmin();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('admin_logged_in');
      if (!loggedIn) {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  const activeCoupons = coupons.filter(c => c.active).length;
  const totalClicks = coupons.reduce((sum, c) => sum + (c.clickCount || 0), 0);
  const totalUsage = coupons.reduce((sum, c) => sum + (c.usageCount || 0), 0);
  const topCoupons = getCouponAnalytics();

  const stats = [
    {
      title: 'Active Coupons',
      value: activeCoupons,
      total: coupons.length,
      icon: Tag,
      description: `${coupons.length - activeCoupons} inactive`,
    },
    {
      title: 'Total Stores',
      value: stores.length,
      icon: Store,
      description: 'All stores',
    },
    {
      title: 'Blog Posts',
      value: blogPosts.length,
      icon: FileText,
      description: 'Published articles',
    },
    {
      title: 'Total Clicks',
      value: totalClicks,
      icon: TrendingUp,
      description: `${totalUsage} total usage`,
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your coupon website</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Coupons</CardTitle>
          <CardDescription>Coupons with the most clicks</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Store</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.title}</TableCell>
                  <TableCell>{coupon.store}</TableCell>
                  <TableCell className="text-right">{coupon.clickCount}</TableCell>
                  <TableCell className="text-right">{coupon.usageCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;