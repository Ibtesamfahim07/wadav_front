'use client';

import { useUser } from '@/components/user/usercontext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Loader2, Search, Store, Edit, Trash2, X } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://https://wadavback1-6iy0oc8nt-totutoti727-5984s-projects.vercel.app/';

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

  const [storeForm, setStoreForm] = useState({
    name: '', url: '', logo: '', description: '', category: 'General',
  });
  const [editingStoreId, setEditingStoreId] = useState<string | null>(null);
  const [loadingStore, setLoadingStore] = useState(false);

  const [couponForm, setCouponForm] = useState({
    title: '', code: '', discount: '', description: '',
  });
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [editingCouponId, setEditingCouponId] = useState<string | null>(null);
  const [loadingCoupon, setLoadingCoupon] = useState(false);

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
          s.coupons.map((c: any) => ({ ...c, storeName: s.name }))
        );
        setCoupons(allCoupons);
      }
    } catch (e) { console.error(e); }
  };

  const fetchAllStores = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const res = await fetch(`${BACKEND_URL}/api/user/stores`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      const data = await res.json();
      if (res.ok && data.success && data.data?.stores) {
        setAllStores(data.data.stores);
      }
    } catch (e) {
      console.error('[Frontend] Fetch error:', e);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchMyData(), fetchAllStores()]);
      setLoading(false);
    };
    load();
  }, [user]);

  useEffect(() => {
    if (myStores.length > 0 && !selectedStoreId) setSelectedStoreId(myStores[0].id);
  }, [myStores, selectedStoreId]);

  const handleAddStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoadingStore(true);
    try {
      const token = localStorage.getItem('userToken');
      const r = await fetch(`${BACKEND_URL}/api/user/create-store`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(storeForm),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message || 'Failed');
      toast({ title: 'Store created!' });
      setStoreForm({ name: '', url: '', logo: '', description: '', category: 'General' });
      fetchMyData(); 
      fetchAllStores();
      router.push('/user/dashboard?view=my-stores');
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally { setLoadingStore(false); }
  };

  const handleEditStore = (store: any) => {
    setEditingStoreId(store.id);
    setStoreForm({
      name: store.name,
      url: store.url || '',
      logo: store.logo || '',
      description: store.description || '',
      category: store.category || 'General',
    });
    router.push('/user/dashboard?view=add-store');
  };

  const handleUpdateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !editingStoreId) return;
    setLoadingStore(true);
    try {
      const token = localStorage.getItem('userToken');
      const r = await fetch(`${BACKEND_URL}/api/user/store/${editingStoreId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(storeForm),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message || 'Failed');
      toast({ title: 'Store updated!' });
      setStoreForm({ name: '', url: '', logo: '', description: '', category: 'General' });
      setEditingStoreId(null);
      fetchMyData(); 
      fetchAllStores();
      router.push('/user/dashboard?view=my-stores');
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally { setLoadingStore(false); }
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

  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedStoreId) {
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
      setCouponForm({ title: '', code: '', discount: '', description: '' });
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
      setCouponForm({ title: '', code: '', discount: '', description: '' });
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

  const filteredMyStores = myStores.filter(s =>
    s.name.toLowerCase().includes(myStoreSearch.toLowerCase())
  );

  const filteredAllStores = allStores.filter(s =>
    s.name.toLowerCase().includes(allStoreSearch.toLowerCase()) ||
    s.user.name.toLowerCase().includes(allStoreSearch.toLowerCase())
  );

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
              setStoreForm({ name: '', url: '', logo: '', description: '', category: 'General' });
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
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground">No stores yet</td>
                  </tr>
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
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground">No stores found</td>
                  </tr>
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

      {/* ADD/EDIT STORE */}
      {view === 'add-store' && (
        <div>
          <h2 className="text-3xl font-bold mb-6">{editingStoreId ? 'Edit Store' : 'Add New Store'}</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Name</Label>
                  <Input required value={storeForm.name} onChange={e => setStoreForm({ ...storeForm, name: e.target.value })} placeholder="Store name" />
                </div>
                <div className="grid gap-2">
                  <Label>URL</Label>
                  <Input value={storeForm.url} onChange={e => setStoreForm({ ...storeForm, url: e.target.value })} placeholder="https://example.com" />
                </div>
                <div className="grid gap-2">
                  <Label>Logo URL</Label>
                  <Input value={storeForm.logo} onChange={e => setStoreForm({ ...storeForm, logo: e.target.value })} placeholder="https://example.com/logo.png" />
                </div>
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Textarea value={storeForm.description} onChange={e => setStoreForm({ ...storeForm, description: e.target.value })} placeholder="Store description" />
                </div>
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Input value={storeForm.category} onChange={e => setStoreForm({ ...storeForm, category: e.target.value })} placeholder="e.g., Fashion, Electronics" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => {
                    setEditingStoreId(null);
                    setStoreForm({ name: '', url: '', logo: '', description: '', category: 'General' });
                    router.push('/user/dashboard?view=my-stores');
                  }}>
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                  <Button onClick={editingStoreId ? handleUpdateStore : handleAddStore} disabled={loadingStore}>
                    {loadingStore ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {editingStoreId ? 'Update Store' : 'Create Store'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
                    <Select value={selectedStoreId} onValueChange={setSelectedStoreId}>
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

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={() => {
                      setEditingCouponId(null);
                      setCouponForm({ title: '', code: '', discount: '', description: '' });
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold">My Coupons</h2>
              <p className="text-muted-foreground">Managing all coupons from your stores</p>
            </div>
            {myStores.length > 0 && (
              <Button onClick={() => {
                setEditingCouponId(null);
                setCouponForm({ title: '', code: '', discount: '', description: '' });
                router.push('/user/dashboard?view=add-coupon');
              }}>
                <Plus className="h-4 w-4 mr-2" /> Add Coupon
              </Button>
            )}
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
                    <th className="p-4 text-left font-medium">Description</th>
                    <th className="p-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-muted-foreground">
                        No coupons yet — add one to get started!
                      </td>
                    </tr>
                  ) : (
                    coupons.map(c => (
                      <tr key={c.id} className="border-b hover:bg-muted/30">
                        <td className="p-4 font-medium">{c.storeName}</td>
                        <td className="p-4">{c.title}</td>
                        <td className="p-4"><code className="bg-muted px-2 py-1 rounded text-xs">{c.code}</code></td>
                        <td className="p-4">{c.discount}</td>
                        <td className="p-4 max-w-xs truncate">{c.description}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleEditCoupon(c)} className="p-2 hover:bg-muted rounded">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleDeleteCoupon(c.id)} className="p-2 hover:bg-destructive/10 text-destructive rounded">
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