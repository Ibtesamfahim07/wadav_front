'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdmin } from '@/contexts/AdminContext';
import { Tag, Store, FileText, TrendingUp, UserPlus, LogOut, X } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { coupons, stores, blogPosts, getCouponAnalytics } = useAdmin();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  
  // Create user form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [storeId, setStoreId] = useState('');
  
  const router = useRouter();
  const { toast } = useToast();

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

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_logged_in');
      localStorage.removeItem('admin_token');
      router.push('/admin/login');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    setIsCreatingUser(true);

    try {
      const userData = {
        name: username,
        password,
        ...(storeId && { storeId }),
      };

      // Direct API call to backend - NO AUTH for now
      const response = await fetch('http://localhost:5000/api/admin/create-user-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      console.log('Create user response:', data);

      if (response.ok && data.success) {
        toast({
          title: 'Success',
          description: 'User created successfully!',
        });
        
        // Reset form and close modal
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setStoreId('');
        setShowCreateUserModal(false);
      } else {
        toast({
          title: 'Failed',
          description: data.message || 'Failed to create user',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Create user error:', error);
      toast({
        title: 'Error',
        description: 'Failed to connect to server',
        variant: 'destructive',
      });
    } finally {
      setIsCreatingUser(false);
    }
  };

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
    <>
      <div className="space-y-6 p-8">
        {/* Header with Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <p className="text-muted-foreground">Overview of your coupon website</p>
          </div>
          <div className="flex gap-2">
            {/* <Button onClick={() => setShowCreateUserModal(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Create User
            </Button> */}
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
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

        {/* Top Performing Coupons */}
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
                {topCoupons.length > 0 ? (
                  topCoupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell className="font-medium">{coupon.title}</TableCell>
                      <TableCell>{coupon.store}</TableCell>
                      <TableCell className="text-right">{coupon.clickCount}</TableCell>
                      <TableCell className="text-right">{coupon.usageCount}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No coupon data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Create User Modal */}
      {showCreateUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Create New User</CardTitle>
                    <CardDescription>Add a new user to the system</CardDescription>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowCreateUserModal(false)}
                  disabled={isCreatingUser}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isCreatingUser}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isCreatingUser}
                    minLength={6}
                  />
                  <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isCreatingUser}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeId">Store ID (Optional)</Label>
                  <Input
                    id="storeId"
                    placeholder="Enter store ID"
                    value={storeId}
                    onChange={(e) => setStoreId(e.target.value)}
                    disabled={isCreatingUser}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isCreatingUser}
                  >
                    {isCreatingUser ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create User
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateUserModal(false)}
                    disabled={isCreatingUser}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Dashboard;