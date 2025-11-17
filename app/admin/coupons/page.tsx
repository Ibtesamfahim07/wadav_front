// app/admin/coupons/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ---------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------
type Store = {
  id: string;
  name: string;
  logo: string;
  url: string;
  category: string;
};

type CouponFromAPI = {
  id: string;
  code: string;
  title: string;
  discount: string;
  description: string;
  expiryDate?: string | null;
  active: boolean;
  verified: boolean;
  usageCount: number;
  clickCount: number;
  type: 'code' | 'link';
  storeId: string;
  storeRef: {
    id: string;
    name: string;
    logo: string;
    url: string;
    category: string;
  };
};

type Coupon = CouponFromAPI & {
  store: string;
  storeLogo: string;
  storeUrl: string;
  category: string;
};

// ---------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------
const API_BASE = 'http://localhost:5000/api';

const API = {
  coupons: `${API_BASE}/admin/coupons`,
  stores: `${API_BASE}/admin/stores`,
};

const fetchJSON = async (url: string, opts?: RequestInit) => {
  console.log('[Frontend] Fetching:', url);
  const res = await fetch(url, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...opts?.headers },
  });
  const data = await res.json();
  console.log('[Frontend] Response:', data);
  if (!res.ok) throw new Error(data.message ?? 'Request failed');
  return data;
};

// Helper to format date
const formatDate = (dateStr?: string | null) => {
  if (!dateStr) return 'No expiry';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// ---------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------
export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const prefillStoreId = searchParams?.get('storeId');

  const [formData, setFormData] = useState({
    code: '',
    title: '',
    discount: '',
    description: '',
    store: '',
    storeLogo: '',
    storeUrl: '',
    category: '',
    expiryDate: '', // Changed from nullable to always string
    active: true,
    verified: true,
    usageCount: 0,
    type: 'code' as 'code' | 'link',
  });

  // Load stores & coupons
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log('[Frontend] Loading coupons and stores...');
        
        const [cRes, sRes] = await Promise.all([
          fetchJSON(API.coupons),
          fetchJSON(API.stores),
        ]);

        // Flatten coupon + storeRef → UI shape
        const flatCoupons: Coupon[] = (cRes.data ?? []).map((c: CouponFromAPI) => ({
          ...c,
          store: c.storeRef.name,
          storeLogo: c.storeRef.logo,
          storeUrl: c.storeRef.url,
          category: c.storeRef.category,
        }));

        console.log('[Frontend] Loaded:', flatCoupons.length, 'coupons');

        setCoupons(flatCoupons);
        setStores(sRes.data ?? []);
      } catch (e: any) {
        console.error('[Frontend] Load error:', e);
        toast({ 
          title: 'Error loading data', 
          description: e.message, 
          variant: 'destructive' 
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  // Pre-fill when coming from a store page
  useEffect(() => {
    if (prefillStoreId && !editingCoupon && stores.length) {
      const store = stores.find((s) => s.id === prefillStoreId);
      if (store) {
        setFormData((prev) => ({
          ...prev,
          store: store.name,
          storeLogo: store.logo,
          storeUrl: store.url,
          category: store.category,
        }));
        setIsDialogOpen(true);
      }
    }
  }, [prefillStoreId, stores, editingCoupon]);

  // Filtering
  const filteredCoupons = coupons.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleEdit = (coupon: Coupon) => {
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
      expiryDate: coupon.expiryDate ? coupon.expiryDate.split('T')[0] : '', // Convert null to empty string
      active: coupon.active,
      verified: coupon.verified,
      usageCount: coupon.usageCount,
      type: coupon.type,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;
    try {
      await fetchJSON(`${API.coupons}/${id}`, { method: 'DELETE' });
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      toast({ title: 'Coupon deleted' });
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const handleStoreChange = (storeName: string) => {
    const store = stores.find((s) => s.name === storeName);
    if (store) {
      setFormData((prev) => ({
        ...prev,
        store: store.name,
        storeLogo: store.logo,
        storeUrl: store.url,
        category: store.category,
      }));
    }
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
      expiryDate: '', // Always empty string, never null
      active: true,
      verified: true,
      usageCount: 0,
      type: 'code',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.code || !formData.store || !formData.discount) {
      toast({
        title: 'Error',
        description: 'Title, Code, Store, and Discount are required',
        variant: 'destructive',
      });
      return;
    }

    const store = stores.find((s) => s.name === formData.store);
    if (!store) {
      toast({ title: 'Error', description: 'Selected store not found', variant: 'destructive' });
      return;
    }

    const payload = {
      title: formData.title,
      code: formData.code,
      discount: formData.discount,
      description: formData.description,
      expiryDate: formData.expiryDate || null, // Send null if empty
      active: formData.active,
      verified: formData.verified,
      usageCount: formData.usageCount,
      type: formData.type,
      storeId: store.id,
    };

    try {
      let newCoupon: CouponFromAPI;
      if (editingCoupon) {
        const res = await fetchJSON(`${API.coupons}/${editingCoupon.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        newCoupon = res.data;
        toast({ title: 'Coupon updated' });
      } else {
        const res = await fetchJSON(API.coupons, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        newCoupon = res.data;
        toast({ title: 'Coupon added successfully' });
      }

      // Flatten again for UI
      const flat: Coupon = {
        ...newCoupon,
        store: newCoupon.storeRef.name,
        storeLogo: newCoupon.storeRef.logo,
        storeUrl: newCoupon.storeRef.url,
        category: newCoupon.storeRef.category,
      };

      setCoupons((prev) =>
        editingCoupon
          ? prev.map((c) => (c.id === editingCoupon.id ? flat : c))
          : [...prev, flat]
      );

      setIsDialogOpen(false);
      setEditingCoupon(null);
      resetForm();
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  // UI
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted-foreground">Loading coupons...</div>
      </div>
    );
  }

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

      {/* Coupons Table - WITH ALL FIELDS */}
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Store</TableHead>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead className="w-[120px]">Code</TableHead>
              <TableHead className="w-[100px]">Discount</TableHead>
              <TableHead className="w-[120px]">Expiry Date</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[250px]">Description</TableHead>
              <TableHead className="text-right w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No coupons found
                </TableCell>
              </TableRow>
            ) : (
              filteredCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.store}</TableCell>
                  <TableCell>{coupon.title}</TableCell>
                  <TableCell>
                    <code className="bg-muted px-2 py-1 rounded text-xs">
                      {coupon.code}
                    </code>
                  </TableCell>
                  <TableCell className="font-semibold text-green-600">
                    {coupon.discount}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(coupon.expiryDate)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        coupon.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {coupon.active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[250px] truncate">
                    {coupon.description || '—'}
                  </TableCell>
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
                  <Select
                    value={formData.type}
                    onValueChange={(v: 'code' | 'link') =>
                      setFormData({ ...formData, type: v })
                    }
                  >
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

              {/* Expiry - FIXED: Now always uses string, never null */}
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
              <Button type="submit">{editingCoupon ? 'Update' : 'Add'} Coupon</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}