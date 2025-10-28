// app/admin/coupons/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CouponsPage() {
  const { coupons, stores, addCoupon, updateCoupon, deleteCoupon } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const prefillStoreId = searchParams.get('storeId');

  const [formData, setFormData] = useState({
    code: '',
    title: '',
    discount: '',
    description: '',
    store: '',
    storeLogo: '',
    storeUrl: '',
    category: '',
    expiryDate: '',
    active: true,
    verified: true,
    usageCount: 0,
    type: 'code' as 'code' | 'link',
  });

  // === PRE-FILL STORE IF COMING FROM USERS PAGE ===
  useEffect(() => {
    if (prefillStoreId && !editingCoupon) {
      const store = stores.find(s => s.id === prefillStoreId);
      if (store) {
        setFormData(prev => ({
          ...prev,
          store: store.name,
          storeLogo: store.logo,
          storeUrl: store.url,
          category: store.category,
        }));
        setIsDialogOpen(true);
        // Clean URL
        router.replace('/admin/coupons', undefined);
      }
    }
  }, [prefillStoreId, stores, editingCoupon, router]);

  const filteredCoupons = coupons.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (coupon: any) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      title: coupon.title,
      discount: coupon.discount,
      description: coupon.description,
      store: coupon.store,
      storeLogo: coupon.storeLogo,
      storeUrl: coupon.storeUrl,
      category: coupon.category,
      expiryDate: coupon.expiryDate || '',
      active: coupon.active ?? true,
      verified: coupon.verified ?? false,
      usageCount: coupon.usageCount || 0,
      type: coupon.type || 'code',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this coupon?')) {
      deleteCoupon(id);
      toast({ title: 'Coupon deleted' });
    }
  };

  const handleStoreChange = (storeName: string) => {
    const store = stores.find(s => s.name === storeName);
    if (store) {
      setFormData({
        ...formData,
        store: store.name,
        storeLogo: store.logo,
        storeUrl: store.url,
        category: store.category,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.code || !formData.store || !formData.discount) {
      toast({ title: 'Error', description: 'Title, Code, Store, and Discount are required', variant: 'destructive' });
      return;
    }

    const couponData = {
      ...formData,
      clickCount: editingCoupon?.clickCount || 0,
    };

    if (editingCoupon) {
      updateCoupon(editingCoupon.id, couponData);
      toast({ title: 'Coupon updated' });
    } else {
      addCoupon({
        id: Date.now().toString(),
        ...couponData,
      });
      toast({ title: 'Coupon added successfully' });
    }

    setIsDialogOpen(false);
    setEditingCoupon(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      code: '',
      title: '',
      discount: '',
      description: '',
      store: '',
      storeLogo: '',
      storeUrl: '',
      category: '',
      expiryDate: '',
      active: true,
      verified: true,
      usageCount: 0,
      type: 'code',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Manage Coupons</h2>
          <p className="text-muted-foreground">Add, edit, or delete coupons</p>
        </div>
        <Button
          onClick={() => {
            setEditingCoupon(null);
            resetForm();
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Coupon
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title, store, or code..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Coupons Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No coupons found
                </TableCell>
              </TableRow>
            ) : (
              filteredCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.title}</TableCell>
                  <TableCell>{coupon.store}</TableCell>
                  <TableCell>
                    <code className="bg-muted px-2 py-1 rounded text-xs">{coupon.code}</code>
                  </TableCell>
                  <TableCell>{coupon.discount}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      coupon.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {coupon.active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>{coupon.clickCount || 0}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(coupon)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(coupon.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCoupon ? 'Edit Coupon' : 'Add New Coupon'}</DialogTitle>
            <DialogDescription>
              {editingCoupon ? 'Update coupon details' : 'Create a new coupon for a store'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">

              {/* Store Selector */}
              <div className="grid gap-2">
                <Label htmlFor="store">Store</Label>
                <Select value={formData.store} onValueChange={handleStoreChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a store" />
                  </SelectTrigger>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem key={store.id} value={store.name}>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-gray-200 border" />
                          <span>{store.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Title & Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. 20% Off Summer Sale"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="code">Coupon Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g. SUMMER20"
                    required
                  />
                </div>
              </div>

              {/* Discount & Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="discount">Discount</Label>
                  <Input
                    id="discount"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    placeholder="e.g. 20% OFF"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Coupon Type</Label>
                  <Select value={formData.type} onValueChange={(v: 'code' | 'link') => setFormData({ ...formData, type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="code">Code (Show Code)</SelectItem>
                      <SelectItem value="link">Link (Get Deal)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Valid on all items above $50"
                  rows={3}
                />
              </div>

              {/* Expiry */}
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(c) => setFormData({ ...formData, active: c })}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="verified"
                    checked={formData.verified}
                    onCheckedChange={(c) => setFormData({ ...formData, verified: c })}
                  />
                  <Label htmlFor="verified">Verified</Label>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
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