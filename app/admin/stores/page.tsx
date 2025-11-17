// app/admin/stores/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Trash2, Search, Loader2 } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const API_BASE = 'http://localhost:5000/api';

export default function StoresPage() {
  const [stores, setStores] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logo: '',
    description: '',
    category: '',
    url: '',
    couponsCount: 0,
    aboutStore: '',
    howToApply: '',
    whyChoose: '',
    faqs: [] as { question: string; answer: string; }[],
    similarStores: [] as string[],
    popularCoupons: '',
    trustContent: '',
    customerSavings: '',
    verifiedSavings: '',
    competitorPricing: '',
    priceComparison: [] as { item: string; withCoupon: string; withoutCoupon: string; savings: string; }[],
    expertTips: '',
    benefits: '',
    whyUseCoupons: '',
  });

  // Fetch stores on mount
  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setFetchLoading(true);
      const token = localStorage.getItem('adminToken');
      
      console.log('[Admin Stores] Fetching with token:', token ? 'exists' : 'missing');
      
      const res = await fetch(`${API_BASE}/admin/stores`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('[Admin Stores] Response status:', res.status);
      const data = await res.json();
      console.log('[Admin Stores] Response data:', data);

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch stores');
      }

      // The backend returns data in { success: true, data: [...stores] }
      const storesData = Array.isArray(data.data) ? data.data : [];
      console.log('[Admin Stores] Setting stores:', storesData.length);
      setStores(storesData);
      
    } catch (error: any) {
      console.error('[Admin Stores] Fetch error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load stores',
        variant: 'destructive',
      });
    } finally {
      setFetchLoading(false);
    }
  };

  const filteredStores = stores.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (store: any) => {
    setEditingStore(store);
    setFormData({
      name: store.name,
      slug: store.slug,
      logo: store.logo,
      description: store.description,
      category: store.category,
      url: store.url,
      couponsCount: store.couponsCount,
      aboutStore: store.aboutStore || '',
      howToApply: store.howToApply || '',
      whyChoose: store.whyChoose || '',
      faqs: store.faqs || [],
      similarStores: store.similarStores || [],
      popularCoupons: store.popularCoupons || '',
      trustContent: store.trustContent || '',
      customerSavings: store.customerSavings || '',
      verifiedSavings: store.verifiedSavings || '',
      competitorPricing: store.competitorPricing || '',
      priceComparison: store.priceComparison || [],
      expertTips: store.expertTips || '',
      benefits: store.benefits || '',
      whyUseCoupons: store.whyUseCoupons || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this store? All associated coupons will also be deleted.')) return;

    try {
      const token = localStorage.getItem('adminToken');
      
      const res = await fetch(`${API_BASE}/admin/stores/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete store');
      }

      toast({ title: 'Store deleted successfully' });
      await fetchStores();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim()) {
      toast({ title: 'Error', description: 'Store name is required', variant: 'destructive' });
      return;
    }
    if (!formData.slug.trim()) {
      toast({ title: 'Error', description: 'Slug is required', variant: 'destructive' });
      return;
    }
    if (!formData.url.trim()) {
      toast({ title: 'Error', description: 'Store URL is required', variant: 'destructive' });
      return;
    }
    if (!formData.category.trim()) {
      toast({ title: 'Error', description: 'Category is required', variant: 'destructive' });
      return;
    }
    if (!formData.description.trim()) {
      toast({ title: 'Error', description: 'Description is required', variant: 'destructive' });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingStore
        ? `${API_BASE}/admin/stores/${editingStore.id}`
        : `${API_BASE}/admin/stores`;

      const res = await fetch(url, {
        method: editingStore ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save store');
      }

      toast({
        title: editingStore ? 'Store updated successfully!' : 'Store created successfully!',
      });

      setIsDialogOpen(false);
      setEditingStore(null);
      resetForm();
      await fetchStores();
    } catch (error: any) {
      console.error('Submit error:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      logo: '',
      description: '',
      category: '',
      url: '',
      couponsCount: 0,
      aboutStore: '',
      howToApply: '',
      whyChoose: '',
      faqs: [],
      similarStores: [],
      popularCoupons: '',
      trustContent: '',
      customerSavings: '',
      verifiedSavings: '',
      competitorPricing: '',
      priceComparison: [],
      expertTips: '',
      benefits: '',
      whyUseCoupons: '',
    });
  };

  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData({ ...formData, name, slug });
  };

  const addFaq = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: '', answer: '' }]
    });
  };

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index][field] = value;
    setFormData({ ...formData, faqs: newFaqs });
  };

  const removeFaq = (index: number) => {
    setFormData({
      ...formData,
      faqs: formData.faqs.filter((_, i) => i !== index)
    });
  };

  const addPriceComparison = () => {
    setFormData({
      ...formData,
      priceComparison: [...formData.priceComparison, { item: '', withCoupon: '', withoutCoupon: '', savings: '' }]
    });
  };

  const updatePriceComparison = (index: number, field: 'item' | 'withCoupon' | 'withoutCoupon' | 'savings', value: string) => {
    const newComparisons = [...formData.priceComparison];
    newComparisons[index][field] = value;
    setFormData({ ...formData, priceComparison: newComparisons });
  };

  const removePriceComparison = (index: number) => {
    setFormData({
      ...formData,
      priceComparison: formData.priceComparison.filter((_, i) => i !== index)
    });
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Manage Stores</h2>
          <p className="text-muted-foreground">Add, edit, or delete stores</p>
        </div>
        {/* <Button onClick={() => {
          setEditingStore(null);
          resetForm();
          setIsDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Store
        </Button> */}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search stores..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Coupons</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No stores found
                </TableCell>
              </TableRow>
            ) : (
              filteredStores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell className="font-medium">{store.name}</TableCell>
                  <TableCell>{store.category}</TableCell>
                  <TableCell>{store.user?.name || 'Unassigned'}</TableCell>
                  <TableCell>{store.couponsCount}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(store)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(store.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingStore ? 'Edit Store' : 'Add New Store'}</DialogTitle>
            <DialogDescription>
              {editingStore ? 'Update store details' : 'Create a new store'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Basic Information</h3>
                <div className="grid gap-2">
                  <Label htmlFor="name">Store Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">Store URL *</Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://store.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="couponsCount">Coupons Count</Label>
                  <Input
                    id="couponsCount"
                    type="number"
                    value={formData.couponsCount}
                    onChange={(e) => setFormData({ ...formData, couponsCount: Number(e.target.value) })}
                  />
                </div>
              </div>

              {/* Store Details */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Store Details</h3>
                <div className="grid gap-2">
                  <Label>About the Store</Label>
                  <Textarea
                    value={formData.aboutStore}
                    onChange={(e) => setFormData({ ...formData, aboutStore: e.target.value })}
                    placeholder="Detailed information about the store..."
                    rows={5}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>How to Apply Coupons</Label>
                  <Textarea
                    value={formData.howToApply}
                    onChange={(e) => setFormData({ ...formData, howToApply: e.target.value })}
                    placeholder="Step-by-step guide..."
                    rows={5}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Why Choose This Store</Label>
                  <Textarea
                    value={formData.whyChoose}
                    onChange={(e) => setFormData({ ...formData, whyChoose: e.target.value })}
                    placeholder="Reasons to shop here..."
                    rows={3}
                  />
                </div>
              </div>

              {/* FAQs */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">FAQs</h3>
                {formData.faqs.map((faq, index) => (
                  <div key={index} className="border p-4 rounded-md space-y-2">
                    <div className="grid gap-2">
                      <Label>Question</Label>
                      <Input
                        value={faq.question}
                        onChange={(e) => updateFaq(index, 'question', e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Answer</Label>
                      <Textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                        rows={2}
                      />
                    </div>
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeFaq(index)}>
                      Remove FAQ
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addFaq}>
                  Add FAQ
                </Button>
              </div>

              {/* Similar Stores */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Similar Stores</h3>
                <div className="grid gap-2">
                  <Label>Similar Stores (comma separated)</Label>
                  <Input
                    value={formData.similarStores.join(', ')}
                    onChange={(e) => setFormData({
                      ...formData,
                      similarStores: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    })}
                    placeholder="Store1, Store2"
                  />
                </div>
              </div>

              {/* Additional Content */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Additional Content</h3>
                {[
                  { label: 'Popular Coupons', key: 'popularCoupons' },
                  { label: 'Trust Content', key: 'trustContent' },
                  { label: 'Customer Savings Stories', key: 'customerSavings' },
                  { label: 'Verified Savings', key: 'verifiedSavings' },
                  { label: 'Competitor Pricing Info', key: 'competitorPricing' },
                  { label: 'Expert Tips', key: 'expertTips' },
                  { label: 'Benefits of Using Coupons', key: 'benefits' },
                  { label: 'Why Use These Coupons', key: 'whyUseCoupons' },
                ].map(({ label, key }) => (
                  <div key={key} className="grid gap-2">
                    <Label>{label}</Label>
                    <Textarea
                      value={formData[key]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      rows={3}
                    />
                  </div>
                ))}

                {/* Price Comparison Table */}
                <div className="space-y-4">
                  <h4 className="font-medium">Price Comparison Table</h4>
                  {formData.priceComparison.map((comp, index) => (
                    <div key={index} className="border p-4 rounded-md space-y-2">
                      <div className="grid gap-2">
                        <Label>Item</Label>
                        <Input
                          value={comp.item}
                          onChange={(e) => updatePriceComparison(index, 'item', e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>With Coupon</Label>
                        <Input
                          value={comp.withCoupon}
                          onChange={(e) => updatePriceComparison(index, 'withCoupon', e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Without Coupon</Label>
                        <Input
                          value={comp.withoutCoupon}
                          onChange={(e) => updatePriceComparison(index, 'withoutCoupon', e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Savings</Label>
                        <Input
                          value={comp.savings}
                          onChange={(e) => updatePriceComparison(index, 'savings', e.target.value)}
                        />
                      </div>
                      <Button type="button" variant="destructive" size="sm" onClick={() => removePriceComparison(index)}>
                        Remove Row
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addPriceComparison}>
                    Add Comparison Row
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {editingStore ? 'Update' : 'Add'} Store
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}