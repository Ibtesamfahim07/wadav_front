// app/user/dashboard/page.tsx
'use client';

import { useUser } from '@/components/user/usercontext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function UserDashboard() {
  const { user, getUserStore } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const store = getUserStore();

  useEffect(() => {
    if (!user) router.push('/user/login');
  }, [user, router]);

  // === REFRESH STATE ===
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    const handler = () => setRefreshKey(prev => prev + 1);
    window.addEventListener('user_session_updated', handler);
    return () => window.removeEventListener('user_session_updated', handler);
  }, []);

  // === ADD STORE ===
  const [showStoreDialog, setShowStoreDialog] = useState(false);
  const [storeForm, setStoreForm] = useState({ name: '', url: '', description: '' });

  const handleAddStore = (e: React.FormEvent) => {
    e.preventDefault();

    const stores = JSON.parse(localStorage.getItem('admin_stores') || '[]');
    const newStore = {
      id: Date.now().toString(),
      name: storeForm.name,
      logo: '/placeholder.svg',
      url: storeForm.url,
      description: storeForm.description,
      category: 'Fashion',
      couponsCount: 0,
    };
    stores.push(newStore);
    localStorage.setItem('admin_stores', JSON.stringify(stores));

    const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
    const updatedUsers = users.map((u: any) =>
      u.id === user?.id ? { ...u, storeId: newStore.id } : u
    );
    localStorage.setItem('admin_users', JSON.stringify(updatedUsers));

    const updatedUser = { ...user!, storeId: newStore.id };
    localStorage.setItem('user_session', JSON.stringify(updatedUser));
    window.dispatchEvent(new Event('user_session_updated'));

    toast({ title: 'Store added!' });
    setShowStoreDialog(false);
    setStoreForm({ name: '', url: '', description: '' });
  };

  // === COUPON CRUD ===
  const [showCouponDialog, setShowCouponDialog] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);
  const [couponForm, setCouponForm] = useState({
    title: '',
    code: '',
    discount: '',
    description: '',
  });

  const resetCouponForm = () => {
    setCouponForm({ title: '', code: '', discount: '', description: '' });
    setEditingCoupon(null);
  };

  const openAddCoupon = () => {
    resetCouponForm();
    setShowCouponDialog(true);
  };

  const openEditCoupon = (coupon: any) => {
    setEditingCoupon(coupon);
    setCouponForm({
      title: coupon.title,
      code: coupon.code,
      discount: coupon.discount,
      description: coupon.description,
    });
    setShowCouponDialog(true);
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!store) return;

    const coupons = JSON.parse(localStorage.getItem('admin_coupons') || '[]');

    if (editingCoupon) {
      // Update
      const updated = coupons.map((c: any) =>
        c.id === editingCoupon.id
          ? {
              ...c,
              ...couponForm,
            }
          : c
      );
      localStorage.setItem('admin_coupons', JSON.stringify(updated));
      toast({ title: 'Coupon updated!' });
    } else {
      // Add
      const newCoupon = {
        id: Date.now().toString(),
        ...couponForm,
        store: store.name,
        storeLogo: store.logo,
        storeUrl: store.url,
        category: store.category,
        clickCount: 0,
        active: true,
        verified: true,
      };
      coupons.push(newCoupon);
      localStorage.setItem('admin_coupons', JSON.stringify(coupons));
      toast({ title: 'Coupon added!' });
    }

    setShowCouponDialog(false);
    resetCouponForm();
  };

  const handleDeleteCoupon = (id: string) => {
    if (!confirm('Delete this coupon?')) return;

    const coupons = JSON.parse(localStorage.getItem('admin_coupons') || '[]');
    const filtered = coupons.filter((c: any) => c.id !== id);
    localStorage.setItem('admin_coupons', JSON.stringify(filtered));
    toast({ title: 'Coupon deleted' });
  };

  const myCoupons = store
    ? JSON.parse(localStorage.getItem('admin_coupons') || '[]').filter(
        (c: any) => c.store === store.name
      )
    : [];

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Welcome, {user.name}</h2>
          <p className="text-muted-foreground">
            {store ? `Managing: ${store.name}` : 'No store yet'}
          </p>
        </div>
        {!store && (
          <Button onClick={() => setShowStoreDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Store
          </Button>
        )}
        {store && (
          <Button onClick={openAddCoupon}>
            <Plus className="h-4 w-4 mr-2" />
            Add Coupon
          </Button>
        )}
      </div>

      {/* Coupons Table */}
      {store && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myCoupons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No coupons yet
                  </TableCell>
                </TableRow>
              ) : (
                myCoupons.map((c: any) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.title}</TableCell>
                    <TableCell>
                      <code className="bg-muted px-2 py-1 rounded text-xs">{c.code}</code>
                    </TableCell>
                    <TableCell>{c.discount}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          c.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {c.active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>{c.clickCount || 0}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditCoupon(c)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCoupon(c.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add Store Dialog */}
      <Dialog open={showStoreDialog} onOpenChange={setShowStoreDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Your Store</DialogTitle>
            <DialogDescription>Enter store details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddStore} className="space-y-4">
            <div className="grid gap-2">
              <Label>Store Name</Label>
              <Input
                value={storeForm.name}
                onChange={e => setStoreForm({ ...storeForm, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Store URL</Label>
              <Input
                value={storeForm.url}
                onChange={e => setStoreForm({ ...storeForm, url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                value={storeForm.description}
                onChange={e => setStoreForm({ ...storeForm, description: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowStoreDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Store</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add / Edit Coupon Dialog */}
      <Dialog open={showCouponDialog} onOpenChange={setShowCouponDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCoupon ? `Edit Coupon` : `Add Coupon for ${store?.name}`}
            </DialogTitle>
            <DialogDescription>
              {editingCoupon ? 'Update coupon details' : 'Create a new coupon'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveCoupon} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  value={couponForm.title}
                  onChange={e => setCouponForm({ ...couponForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Code</Label>
                <Input
                  value={couponForm.code}
                  onChange={e => setCouponForm({ ...couponForm, code: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Discount</Label>
              <Input
                value={couponForm.discount}
                onChange={e => setCouponForm({ ...couponForm, discount: e.target.value })}
                placeholder="20% OFF"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                value={couponForm.description}
                onChange={e => setCouponForm({ ...couponForm, description: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowCouponDialog(false);
                  resetCouponForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingCoupon ? 'Update' : 'Add'} Coupon
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}