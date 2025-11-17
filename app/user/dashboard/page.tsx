'use client';

import { useUser } from '@/components/user/usercontext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Loader2, Search, Store, Edit, Trash2, X, FileText } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function UserDashboard() {
  const { user, isLoading: isCheckingAuth } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const view = searchParams.get('view') || 'my-stores';

  const [myStores, setMyStores] = useState<any[]>([]);
  const [allStores, setAllStores] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [myStoreSearch, setMyStoreSearch] = useState('');
  const [allStoreSearch, setAllStoreSearch] = useState('');

  // BASIC STORE FORM (only 7 fields)
  const [storeFormBasic, setStoreFormBasic] = useState({
    name: '', slug: '', logo: '', url: '', category: '', description: '', couponsCount: 0,
  });

  // SEO STORE FORM (all rich content)
  const [storeFormSeo, setStoreFormSeo] = useState({
    aboutStore: '', howToApply: '', whyChoose: '',
    faqs: [] as { question: string; answer: string }[],
    similarStores: [] as string[],
    popularCoupons: '', trustContent: '', customerSavings: '', verifiedSavings: '',
    competitorPricing: '', priceComparison: [] as { item: string; withCoupon: string; withoutCoupon: string; savings: string }[],
    expertTips: '', benefits: '', whyUseCoupons: '',
  });

  const [editingStoreId, setEditingStoreId] = useState<string | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [loadingStore, setLoadingStore] = useState(false);
  const [loadingSeo, setLoadingSeo] = useState(false);

  // COUPON FORM (unchanged)
  const [couponForm, setCouponForm] = useState({
    title: '', code: '', discount: '', description: '', expiryDate: '', active: true,
  });
  const [editingCouponId, setEditingCouponId] = useState<string | null>(null);
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  // === NEW: Temp Coupons for Bulk Add in Add/Edit Store ===
  const [tempCoupons, setTempCoupons] = useState<Array<{
    title: string;
    code: string;
    discount: string;
    description: string;
    expiryDate: string;
    active: boolean;
  }>>([]);
  const [loadingCoupons, setLoadingCoupons] = useState(false);

  // === NEW: Track newly created store ID to stay on page ===
  const [justCreatedStoreId, setJustCreatedStoreId] = useState<string | null>(null);

  useEffect(() => {
    if (!isCheckingAuth && !user) router.replace('/user/login');
  }, [user, isCheckingAuth, router]);

  const fetchMyData = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem('userToken');
      const res = await fetch(`${BACKEND_URL}/api/user/${user.id}/store`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.data?.stores) {
        setMyStores(data.data.stores);
        const allCoupons = data.data.stores.flatMap((s: any) =>
          s.coupons.map((c: any) => ({ ...c, storeName: s.name, storeId: s.id }))
        );
        setCoupons(allCoupons);
      }
    } catch (e) { console.error(e); }
  };

  const fetchAllStores = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const res = await fetch(`${BACKEND_URL}/api/user/stores`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.ok && data.success && data.data?.stores) {
        setAllStores(data.data.stores);
      }
    } catch (e) { console.error('[Frontend] Fetch error:', e); }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchMyData(), fetchAllStores()]);
      setLoading(false);
    };
    load();
  }, [user]);

  // BASIC STORE HELPERS
  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setStoreFormBasic(s => ({ ...s, name, slug }));
  };

  const resetBasicForm = () => {
    setStoreFormBasic({
      name: '', slug: '', logo: '', url: '', category: '', description: '', couponsCount: 0,
    });
  };

  const handleAddBasic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoadingStore(true);
    try {
      const token = localStorage.getItem('userToken');
      const r = await fetch(`${BACKEND_URL}/api/user/create-store`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(storeFormBasic),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message || 'Failed');

      toast({ title: 'Store created!' });

      // === NEW: Get new store ID and stay on add-store page ===
      const newStore = d.data?.store;
      if (newStore?.id) {
        setEditingStoreId(newStore.id);
        setJustCreatedStoreId(newStore.id);
        setStoreFormBasic({
          name: newStore.name,
          slug: newStore.slug,
          logo: newStore.logo,
          url: newStore.url,
          category: newStore.category,
          description: newStore.description,
          couponsCount: newStore.couponsCount || 0,
        });
      }

      await fetchMyData();
      await fetchAllStores();

      // Stay on add-store page
      router.replace('/user/dashboard?view=add-store');
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally { setLoadingStore(false); }
  };

  const handleUpdateBasic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !editingStoreId) return;
    setLoadingStore(true);
    try {
      const token = localStorage.getItem('userToken');
      const r = await fetch(`${BACKEND_URL}/api/user/store/${editingStoreId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(storeFormBasic),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message || 'Failed');
      toast({ title: 'Store updated!' });
      resetBasicForm();
      setEditingStoreId(null);
      setJustCreatedStoreId(null);
      fetchMyData(); 
      fetchAllStores();
      router.push('/user/dashboard?view=my-stores');
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally { setLoadingStore(false); }
  };

  const handleEditStore = (store: any) => {
    setEditingStoreId(store.id);
    setJustCreatedStoreId(null);
    setStoreFormBasic({
      name: store.name || '',
      slug: store.slug || '',
      logo: store.logo || '',
      url: store.url || '',
      category: store.category || '',
      description: store.description || '',
      couponsCount: store.couponsCount || 0,
    });
    setTempCoupons([]);
    router.push('/user/dashboard?view=add-store');
  };

  const handleDeleteStore = async (storeId: string) => {
    if (!confirm('Are you sure you want to delete this store?')) return;
    try {
      const token = localStorage.getItem('userToken');
      const r = await fetch(`${BACKEND_URL}/api/user/store/${storeId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!r.ok) throw new Error('Failed to delete');
      toast({ title: 'Store deleted!' });
      fetchMyData();
      fetchAllStores();
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  // SEO HELPERS
  const loadSeoForStore = (storeId: string) => {
    setSelectedStoreId(storeId);
    const store = myStores.find(s => s.id === storeId);
    if (!store) return;
    setStoreFormSeo({
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
  };

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStoreId) return;
    setLoadingSeo(true);
    try {
      const token = localStorage.getItem('userToken');
      const r = await fetch(`${BACKEND_URL}/api/user/store/${selectedStoreId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(storeFormSeo),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message || 'Failed');
      toast({ title: 'SEO content saved!' });
      fetchMyData();
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally { setLoadingSeo(false); }
  };

  const addFaq = () => setStoreFormSeo(s => ({ ...s, faqs: [...s.faqs, { question: '', answer: '' }] }));
  const updateFaq = (i: number, field: 'question' | 'answer', v: string) => {
    const newFaqs = [...storeFormSeo.faqs];
    newFaqs[i][field] = v;
    setStoreFormSeo(s => ({ ...s, faqs: newFaqs }));
  };
  const removeFaq = (i: number) => setStoreFormSeo(s => ({ ...s, faqs: s.faqs.filter((_, idx) => idx !== i) }));

  const addPriceComparison = () => setStoreFormSeo(s => ({
    ...s,
    priceComparison: [...s.priceComparison, { item: '', withCoupon: '', withoutCoupon: '', savings: '' }]
  }));
  const updatePriceComparison = (i: number, field: 'item' | 'withCoupon' | 'withoutCoupon' | 'savings', v: string) => {
    const rows = [...storeFormSeo.priceComparison];
    rows[i][field] = v;
    setStoreFormSeo(s => ({ ...s, priceComparison: rows }));
  };
  const removePriceComparison = (i: number) => setStoreFormSeo(s => ({
    ...s,
    priceComparison: s.priceComparison.filter((_, idx) => idx !== i)
  }));

  // COUPON HELPERS (unchanged)
  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedStoreId || selectedStoreId === 'all') {
      toast({ title: 'Error', description: 'Please select a store', variant: 'destructive' });
      return;
    }
    setLoadingCoupon(true);
    try {
      const token = localStorage.getItem('userToken');
      const r = await fetch(`${BACKEND_URL}/api/user/add-coupon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...couponForm, storeId: selectedStoreId }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message || 'Failed');
      toast({ title: 'Coupon added successfully!' });
      setCouponForm({ title: '', code: '', discount: '', description: '', expiryDate: '', active: true });
      fetchMyData();
      router.push('/user/dashboard?view=my-coupons');
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally { setLoadingCoupon(false); }
  };

  const handleEditCoupon = (coupon: any) => {
    setEditingCouponId(coupon.id);
    setCouponForm({
      title: coupon.title,
      code: coupon.code,
      discount: coupon.discount,
      description: coupon.description || '',
      expiryDate: coupon.expiryDate ? new Date(coupon.expiryDate).toISOString().split('T')[0] : '',
      active: coupon.active ?? true,
    });
    setSelectedStoreId(coupon.storeId);
    router.push('/user/dashboard?view=add-coupon');
  };

  const handleUpdateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !editingCouponId) return;
    setLoadingCoupon(true);
    try {
      const token = localStorage.getItem('userToken');
      const r = await fetch(`${BACKEND_URL}/api/user/coupon/${editingCouponId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...couponForm, storeId: selectedStoreId }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message || 'Failed');
      toast({ title: 'Coupon updated!' });
      setCouponForm({ title: '', code: '', discount: '', description: '', expiryDate: '', active: true });
      setEditingCouponId(null);
      fetchMyData();
      router.push('/user/dashboard?view=my-coupons');
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally { setLoadingCoupon(false); }
  };

  const handleDeleteCoupon = async (couponId: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;
    try {
      const token = localStorage.getItem('userToken');
      const r = await fetch(`${BACKEND_URL}/api/user/coupon/${couponId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!r.ok) throw new Error('Failed to delete');
      toast({ title: 'Coupon deleted!' });
      fetchMyData();
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  // === NEW: Temp Coupon Helpers (Used in both Add & Edit Store) ===
  const updateTempCoupon = (index: number, field: keyof typeof tempCoupons[0], value: any) => {
    setTempCoupons(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddAllCoupons = async () => {
    const storeId = editingStoreId;
    if (!storeId || tempCoupons.length === 0) return;
    setLoadingCoupons(true);
    try {
      const token = localStorage.getItem('userToken');
      const validCoupons = tempCoupons.filter(c => c.title && c.code && c.discount);

      if (validCoupons.length === 0) {
        toast({ title: 'Error', description: 'At least one coupon must have title, code, and discount.', variant: 'destructive' });
        return;
      }

      const promises = validCoupons.map(coupon =>
        fetch(`${BACKEND_URL}/api/user/add-coupon`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ ...coupon, storeId }),
        }).then(r => r.json())
      );

      const results = await Promise.all(promises);
      const failed = results.filter(r => !r.success);

      if (failed.length === 0) {
        toast({ title: `Success! ${validCoupons.length} coupon(s) added.` });
        setTempCoupons([]);
        fetchMyData();
      } else {
        toast({ title: 'Partial Success', description: `${failed.length} coupon(s) failed.`, variant: 'destructive' });
      }
    } catch (e: any) {
      toast({ title: 'Error', description: e.message || 'Failed to add coupons.', variant: 'destructive' });
    } finally {
      setLoadingCoupons(false);
    }
  };

  const filteredMyStores = myStores.filter(s =>
    s.name.toLowerCase().includes(myStoreSearch.toLowerCase())
  );

  const filteredAllStores = allStores.filter(s =>
    s.name.toLowerCase().includes(allStoreSearch.toLowerCase()) ||
    s.user.name.toLowerCase().includes(allStoreSearch.toLowerCase())
  );

  const filteredCoupons = selectedStoreId === 'all'
    ? coupons
    : coupons.filter(c => c.storeId === selectedStoreId);

  if (isCheckingAuth || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* MY STORES */}
      {view === 'my-stores' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">My Stores</h2>
            <Button onClick={() => {
              setEditingStoreId(null);
              setJustCreatedStoreId(null);
              resetBasicForm();
              setTempCoupons([]);
              router.push('/user/dashboard?view=add-store');
            }}>
              <Plus className="h-4 w-4 mr-2" /> Add Store
            </Button>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search my stores..." value={myStoreSearch} onChange={e => setMyStoreSearch(e.target.value)} />
          </div>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="p-4 text-left font-medium">Logo</th>
                  <th className="p-4 text-left font-medium">Name</th>
                  <th className="p-4 text-left font-medium">Category</th>
                  <th className="p-4 text-left font-medium">Description</th>
                  <th className="p-4 text-left font-medium">URL</th>
                  <th className="p-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMyStores.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">No stores yet</td></tr>
                ) : (
                  filteredMyStores.map(store => (
                    <tr key={store.id} className="border-b hover:bg-muted/30">
                      <td className="p-4">
                        {store.logo ? (
                          <img src={store.logo} alt={store.name} className="w-10 h-10 rounded-full" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Store className="h-5 w-5 text-primary" />
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-medium">{store.name}</td>
                      <td className="p-4">{store.category}</td>
                      <td className="p-4 max-w-xs truncate">{store.description || 'No description'}</td>
                      <td className="p-4">
                        {store.url ? (
                          <a href={store.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">Visit</a>
                        ) : '-'}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEditStore(store)} className="p-2 hover:bg-muted rounded">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDeleteStore(store.id)} className="p-2 hover:bg-destructive/10 text-destructive rounded">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ALL STORES */}
      {view === 'all-stores' && (
        <div>
          <h2 className="text-3xl font-bold mb-6">All Stores</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search all stores..." value={allStoreSearch} onChange={e => setAllStoreSearch(e.target.value)} />
          </div>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="p-4 text-left font-medium">Logo</th>
                  <th className="p-4 text-left font-medium">Name</th>
                  <th className="p-4 text-left font-medium">Owner</th>
                  <th className="p-4 text-left font-medium">Category</th>
                  <th className="p-4 text-left font-medium">Description</th>
                  <th className="p-4 text-left font-medium">URL</th>
                </tr>
              </thead>
              <tbody>
                {filteredAllStores.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">No stores found</td></tr>
                ) : (
                  filteredAllStores.map(store => (
                    <tr key={store.id} className="border-b hover:bg-muted/30">
                      <td className="p-4">
                        {store.logo ? (
                          <img src={store.logo} alt={store.name} className="w-10 h-10 rounded-full" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Store className="h-5 w-5 text-primary" />
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-medium">{store.name}</td>
                      <td className="p-4 text-primary">{store.user.name}</td>
                      <td className="p-4">{store.category}</td>
                      <td className="p-4 max-w-xs truncate">{store.description || 'No description'}</td>
                      <td className="p-4">
                        {store.url ? (
                          <a href={store.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">Visit</a>
                        ) : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD/EDIT STORE - BASIC + COUPONS */}
      {view === 'add-store' && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold mb-6">
            {editingStoreId ? 'Edit Store' : 'Add New Store'}
          </h2>

          <form className="space-y-6 max-w-4xl">
            {/* === BASIC STORE FORM === */}
            <section className="space-y-6">
              <h3 className="text-xl font-semibold">Basic Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Store Name *</Label>
                  <Input id="name" required value={storeFormBasic.name} onChange={e => handleNameChange(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input id="slug" required value={storeFormBasic.slug} onChange={e => setStoreFormBasic(s => ({ ...s, slug: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo URL *</Label>
                  <Input id="logo" required placeholder="https://example.com/logo.png" value={storeFormBasic.logo} onChange={e => setStoreFormBasic(s => ({ ...s, logo: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">Store URL *</Label>
                  <Input id="url" required placeholder="https://example.com" value={storeFormBasic.url} onChange={e => setStoreFormBasic(s => ({ ...s, url: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input id="category" required value={storeFormBasic.category} onChange={e => setStoreFormBasic(s => ({ ...s, category: e.target.value }))} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea id="description" required rows={3} value={storeFormBasic.description} onChange={e => setStoreFormBasic(s => ({ ...s, description: e.target.value }))} />
                </div>
              </div>
            </section>

            {/* === SAVE / CANCEL BUTTONS === */}
            <div className="flex gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => {
                setEditingStoreId(null);
                setJustCreatedStoreId(null);
                resetBasicForm();
                setTempCoupons([]);
                router.push('/user/dashboard?view=my-stores');
              }}>
                <X className="h-4 w-4 mr-2" /> Cancel
              </Button>
              <Button type="submit" onClick={editingStoreId ? handleUpdateBasic : handleAddBasic} disabled={loadingStore}>
                {loadingStore ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {editingStoreId ? 'Update Store' : 'Create Store'}
              </Button>
            </div>
          </form>

          {/* === COUPON SECTION: Only show if editing (including just created) === */}
          {editingStoreId && (
            <div className="mt-8 space-y-6">
              <h3 className="text-xl font-semibold">Add Coupons (Optional)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add multiple coupons for <strong>{storeFormBasic.name}</strong>
              </p>

              {/* === RECTANGULAR SCROLLABLE DIV WITH FIXED BUTTON === */}
              <div className="relative border rounded-lg bg-muted/10" style={{ height: '500px' }}>
                {/* Fixed "Add New Coupon" Button - Top Right */}
                <div className="absolute top-3 right-3 z-10">
                  <Button
                    size="sm"
                    onClick={() => setTempCoupons(prev => [...prev, {
                      title: '', code: '', discount: '', description: '', expiryDate: '', active: true
                    }])}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add New Coupon
                  </Button>
                </div>

                {/* Scrollable List of Coupon Forms */}
                <div className="h-full overflow-y-auto pt-14 px-4 pb-4">
                  {tempCoupons.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <FileText className="h-12 w-12 mb-3 opacity-50" />
                      <p>No coupons added yet. Click "Add New Coupon" to start.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {tempCoupons.map((coupon, index) => (
                        <div key={index} className="border rounded-lg p-5 bg-white shadow-sm relative">
                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => setTempCoupons(prev => prev.filter((_, i) => i !== index))}
                            className="absolute top-3 right-3 p-1.5 hover:bg-destructive/10 rounded-full transition"
                          >
                            <X className="h-4 w-4 text-destructive" />
                          </button>

                          {/* Store Name (Fixed) */}
                          <div className="mb-4">
                            <Label className="text-xs text-muted-foreground">Store</Label>
                            <div className="font-medium text-sm">{storeFormBasic.name}</div>
                          </div>

                          {/* Coupon Form Fields in Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Title *</Label>
                              <Input
                                value={coupon.title}
                                onChange={e => updateTempCoupon(index, 'title', e.target.value)}
                                placeholder="e.g. 20% Off Summer Sale"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Coupon Code *</Label>
                              <Input
                                value={coupon.code}
                                onChange={e => updateTempCoupon(index, 'code', e.target.value)}
                                placeholder="e.g. SUMMER20"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Discount *</Label>
                              <Input
                                value={coupon.discount}
                                onChange={e => updateTempCoupon(index, 'discount', e.target.value)}
                                placeholder="e.g. 20% OFF"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Expiry Date (Optional)</Label>
                              <Input
                                type="date"
                                value={coupon.expiryDate}
                                onChange={e => updateTempCoupon(index, 'expiryDate', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label>Description</Label>
                              <Textarea
                                value={coupon.description}
                                onChange={e => updateTempCoupon(index, 'description', e.target.value)}
                                placeholder="e.g. Valid on all items above $50"
                                rows={2}
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={coupon.active}
                                onCheckedChange={checked => updateTempCoupon(index, 'active', checked)}
                              />
                              <Label>Active</Label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit All Coupons Button (Below Scrollable Div) */}
              {tempCoupons.length > 0 && (
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={handleAddAllCoupons}
                    disabled={loadingCoupons}
                    className="min-w-48"
                  >
                    {loadingCoupons ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Add {tempCoupons.length} Coupon{tempCoupons.length > 1 ? 's' : ''}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Optional: Show message when not in edit mode */}
          {!editingStoreId && (
            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                Save the store to unlock coupon addition.
              </p>
            </div>
          )}
        </div>
      )}

      {/* SEO STORE PAGE */}
      {view === 'seo-store' && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold mb-2">SEO Store Page</h2>
          <p className="text-muted-foreground mb-6">Manage rich SEO content for a store</p>

          <div className="max-w-xs">
            <Label>Select Store</Label>
            <Select value={selectedStoreId || ''} onValueChange={loadSeoForStore}>
              <SelectTrigger><SelectValue placeholder="Choose a store" /></SelectTrigger>
              <SelectContent>
                {myStores.map(s => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedStoreId && (
            <form onSubmit={handleSaveSeo} className="space-y-8 max-w-5xl">
              {/* Store Details */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold">Store Details</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>About the Store</Label>
                    <Textarea rows={5} value={storeFormSeo.aboutStore} onChange={e => setStoreFormSeo(s => ({ ...s, aboutStore: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>How to Apply Coupons</Label>
                    <Textarea rows={5} value={storeFormSeo.howToApply} onChange={e => setStoreFormSeo(s => ({ ...s, howToApply: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Why Choose This Store</Label>
                    <Textarea rows={3} value={storeFormSeo.whyChoose} onChange={e => setStoreFormSeo(s => ({ ...s, whyChoose: e.target.value }))} />
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold">FAQs</h3>
                {storeFormSeo.faqs.map((faq, i) => (
                  <div key={i} className="border p-4 rounded-md space-y-4 bg-muted/20">
                    <div className="flex justify-between">
                      <span className="font-medium">FAQ #{i + 1}</span>
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeFaq(i)}>Remove</Button>
                    </div>
                    <div className="grid gap-2">
                      <Label>Question</Label>
                      <Input value={faq.question} onChange={e => updateFaq(i, 'question', e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <Label>Answer</Label>
                      <Textarea rows={2} value={faq.answer} onChange={e => updateFaq(i, 'answer', e.target.value)} />
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addFaq}>Add FAQ</Button>
              </section>

              {/* Similar Stores */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold">Similar Stores</h3>
                <Input
                  value={storeFormSeo.similarStores.join(', ')}
                  onChange={e => setStoreFormSeo(s => ({
                    ...s,
                    similarStores: e.target.value.split(',').map(x => x.trim()).filter(Boolean)
                  }))}
                  placeholder="Store A, Store B"
                />
              </section>

              {/* Additional Content */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold">Additional Content</h3>
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
                  <div key={key} className="space-y-2">
                    <Label>{label}</Label>
                    <Textarea rows={3} value={(storeFormSeo as any)[key]} onChange={e => setStoreFormSeo(s => ({ ...s, [key]: e.target.value }))} />
                  </div>
                ))}
              </section>

              {/* Price Comparison */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold">Price Comparison Table</h3>
                {storeFormSeo.priceComparison.map((row, i) => (
                  <div key={i} className="border p-4 rounded-md space-y-4 bg-muted/20">
                    <div className="flex justify-between">
                      <span className="font-medium">Row #{i + 1}</span>
                      <Button type="button" variant="destructive" size="sm" onClick={() => removePriceComparison(i)}>Remove Row</Button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {(['item', 'withCoupon', 'withoutCoupon', 'savings'] as const).map(f => (
                        <div key={f} className="space-y-2">
                          <Label>
                            {f === 'item' ? 'Item' :
                             f === 'withCoupon' ? 'With Coupon' :
                             f === 'withoutCoupon' ? 'Without Coupon' : 'Savings'}
                          </Label>
                          <Input value={row[f]} onChange={e => updatePriceComparison(i, f, e.target.value)} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addPriceComparison}>Add Comparison Row</Button>
              </section>

              <div className="flex gap-3 pt-6">
                <Button type="button" variant="outline" onClick={() => router.push('/user/dashboard?view=my-stores')}>
                  <X className="h-4 w-4 mr-2" /> Cancel
                </Button>
                <Button type="submit" disabled={loadingSeo}>
                  {loadingSeo ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Save SEO
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ADD/EDIT COUPON */}
      {view === 'add-coupon' && (
        <div>
          <h2 className="text-3xl font-bold mb-2">{editingCouponId ? 'Edit Coupon' : 'Add New Coupon'}</h2>
          <p className="text-muted-foreground mb-6">{editingCouponId ? 'Update coupon details' : 'Create a new coupon for a store'}</p>
          
          {myStores.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Store className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">You need to create a store first</p>
                <Button onClick={() => router.push('/user/dashboard?view=add-store')}>
                  <Plus className="h-4 w-4 mr-2" /> Add Store
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="max-w-2xl">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Store</Label>
                    <Select value={selectedStoreId || ''} onValueChange={setSelectedStoreId}>
                      <SelectTrigger><SelectValue placeholder="Select a store" /></SelectTrigger>
                      <SelectContent>
                        {myStores.map(store => (
                          <SelectItem key={store.id} value={store.id}>{store.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Title</Label>
                      <Input required value={couponForm.title} onChange={e => setCouponForm({ ...couponForm, title: e.target.value })} placeholder="e.g. 20% Off Summer Sale" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Coupon Code</Label>
                      <Input required value={couponForm.code} onChange={e => setCouponForm({ ...couponForm, code: e.target.value })} placeholder="e.g. SUMMER20" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Discount</Label>
                    <Input required value={couponForm.discount} onChange={e => setCouponForm({ ...couponForm, discount: e.target.value })} placeholder="e.g. 20% OFF" />
                  </div>

                  <div className="grid gap-2">
                    <Label>Description</Label>
                    <Textarea value={couponForm.description} onChange={e => setCouponForm({ ...couponForm, description: e.target.value })} placeholder="e.g. Valid on all items above $50" rows={3} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                    <Input id="expiryDate" type="date" value={couponForm.expiryDate} onChange={e => setCouponForm({ ...couponForm, expiryDate: e.target.value })} />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="active" checked={couponForm.active} onCheckedChange={checked => setCouponForm({ ...couponForm, active: checked })} />
                    <Label htmlFor="active">Active</Label>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={() => {
                      setEditingCouponId(null);
                      setCouponForm({ title: '', code: '', discount: '', description: '', expiryDate: '', active: true });
                      router.push('/user/dashboard?view=my-coupons');
                    }}>
                      <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                    <Button onClick={editingCouponId ? handleUpdateCoupon : handleAddCoupon} disabled={loadingCoupon || !selectedStoreId}>
                      {loadingCoupon ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      {editingCouponId ? 'Update Coupon' : 'Add Coupon'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* MY COUPONS */}
      {view === 'my-coupons' && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold">My Coupons</h2>
              <p className="text-muted-foreground">View and manage coupons across all stores</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-64">
                <Select value={selectedStoreId || 'all'} onValueChange={setSelectedStoreId}>
                  <SelectTrigger>
                    <SelectValue placeholder="All my stores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All my stores</SelectItem>
                    {myStores.map(store => (
                      <SelectItem key={store.id} value={store.id}>{store.name} (mine)</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {myStores.length > 0 && (
                <Button onClick={() => {
                  setEditingCouponId(null);
                  setCouponForm({ title: '', code: '', discount: '', description: '', expiryDate: '', active: true });
                  setSelectedStoreId(myStores[0].id);
                  router.push('/user/dashboard?view=add-coupon');
                }}>
                  <Plus className="h-4 w-4 mr-2" /> Add Coupon
                </Button>
              )}
            </div>
          </div>

          {myStores.length > 0 ? (
            <div className="border rounded-lg overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="p-4 text-left font-medium">Store</th>
                    <th className="p-4 text-left font-medium">Title</th>
                    <th className="p-4 text-left font-medium">Code</th>
                    <th className="p-4 text-left font-medium">Discount</th>
                    <th className="p-4 text-left font-medium">Expiry Date</th>
                    <th className="p-4 text-left font-medium">Status</th>
                    <th className="p-4 text-left font-medium">Description</th>
                    <th className="p-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoupons.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-muted-foreground">
                        No coupons found for the selected store.
                      </td>
                    </tr>
                  ) : (
                    filteredCoupons.map(c => (
                      <tr key={c.id} className="border-b hover:bg-muted/30">
                        <td className="p-4 font-medium">{c.storeName}</td>
                        <td className="p-4">{c.title}</td>
                        <td className="p-4">
                          <code className="bg-muted px-2 py-1 rounded text-xs font-mono">{c.code}</code>
                        </td>
                        <td className="p-4">{c.discount}</td>
                        <td className="p-4">
                          {c.expiryDate ? (
                            <span className="text-sm">{new Date(c.expiryDate).toLocaleDateString()}</span>
                          ) : (
                            <span className="text-muted-foreground text-sm">No expiry</span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${c.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {c.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="p-4 max-w-xs truncate">{c.description || '-'}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {myStores.some(s => s.id === c.storeId) && (
                              <>
                                <button onClick={() => handleEditCoupon(c)} className="p-2 hover:bg-muted rounded" title="Edit">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button onClick={() => handleDeleteCoupon(c.id)} className="p-2 hover:bg-destructive/10 text-destructive rounded" title="Delete">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Store className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">You need to create a store first</p>
                <Button onClick={() => router.push('/user/dashboard?view=add-store')}>
                  <Plus className="h-4 w-4 mr-2" /> Add Store
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}