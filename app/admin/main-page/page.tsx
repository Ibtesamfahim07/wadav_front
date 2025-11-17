// app/admin/main-page/page.tsx
'use client';

import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export default function MainPage() {
  const { homePageSettings, updateHomePageSettings, stores, coupons, blogPosts } = useAdmin();
  const { toast } = useToast();
  
  const [heroTitle, setHeroTitle] = useState(homePageSettings.heroTitle);
  const [heroDescription, setHeroDescription] = useState(homePageSettings.heroDescription);
  const [maxCouponsDisplay, setMaxCouponsDisplay] = useState(homePageSettings.maxCouponsDisplay);
  const [selectedFeaturedStores, setSelectedFeaturedStores] = useState<string[]>(homePageSettings.featuredStoreIds);
  const [selectedTopStores, setSelectedTopStores] = useState<string[]>(homePageSettings.topStoreIds);
  const [selectedPopularStores, setSelectedPopularStores] = useState<string[]>(homePageSettings.popularStoreIds);
  const [selectedFeaturedCoupons, setSelectedFeaturedCoupons] = useState<string[]>(homePageSettings.featuredCouponIds);
  const [selectedFeaturedBlogPosts, setSelectedFeaturedBlogPosts] = useState<string[]>(homePageSettings.featuredBlogPostIds);

  const handleSave = () => {
    updateHomePageSettings({
      heroTitle,
      heroDescription,
      maxCouponsDisplay,
      featuredStoreIds: selectedFeaturedStores,
      topStoreIds: selectedTopStores,
      popularStoreIds: selectedPopularStores,
      featuredCouponIds: selectedFeaturedCoupons,
      featuredBlogPostIds: selectedFeaturedBlogPosts,
    });
    toast({
      title: 'Settings saved',
      description: 'Homepage settings have been updated successfully',
    });
  };

  const toggleStore = (storeId: string, section: 'featured' | 'top' | 'popular') => {
    if (section === 'featured') {
      setSelectedFeaturedStores(prev =>
        prev.includes(storeId) ? prev.filter(id => id !== storeId) : [...prev, storeId]
      );
    } else if (section === 'top') {
      setSelectedTopStores(prev =>
        prev.includes(storeId) ? prev.filter(id => id !== storeId) : [...prev, storeId]
      );
    } else {
      setSelectedPopularStores(prev =>
        prev.includes(storeId) ? prev.filter(id => id !== storeId) : [...prev, storeId]
      );
    }
  };

  const toggleCoupon = (couponId: string) => {
    setSelectedFeaturedCoupons(prev =>
      prev.includes(couponId) ? prev.filter(id => id !== couponId) : [...prev, couponId]
    );
  };

  const toggleBlogPost = (postId: string) => {
    setSelectedFeaturedBlogPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Main Page</h1>
        <p className="text-muted-foreground mt-2">
          Customize the homepage content and featured items
        </p>
      </div>

      {/* Hero Section Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Configure the main hero section at the top of the homepage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Input
              id="heroTitle"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="heroDescription">Hero Description</Label>
            <Textarea
              id="heroDescription"
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="maxCouponsDisplay">Max Coupons to Display</Label>
            <Input
              id="maxCouponsDisplay"
              type="number"
              value={maxCouponsDisplay}
              onChange={(e) => setMaxCouponsDisplay(Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Featured Coupons Section */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Coupons</CardTitle>
          <CardDescription>Select coupons to feature on the homepage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`coupon-${coupon.id}`}
                  checked={selectedFeaturedCoupons.includes(coupon.id)}
                  onCheckedChange={() => toggleCoupon(coupon.id)}
                />
                <label
                  htmlFor={`coupon-${coupon.id}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {coupon.title} ({coupon.store})
                </label>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Selected: {selectedFeaturedCoupons.length} (If empty, top 10 by clicks will be shown)
          </p>
        </CardContent>
      </Card>

      {/* Featured Articles Section - FIXED: Use postId instead of id */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Articles</CardTitle>
          <CardDescription>Select blog posts to feature on the homepage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
            {blogPosts.map((post) => (
              <div key={post.postId} className="flex items-center space-x-2">
                <Checkbox
                  id={`blog-${post.postId}`}
                  checked={selectedFeaturedBlogPosts.includes(String(post.postId))}
                  onCheckedChange={() => toggleBlogPost(String(post.postId))}
                />
                <label
                  htmlFor={`blog-${post.postId}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {post.title}
                </label>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Selected: {selectedFeaturedBlogPosts.length} (If empty, all posts will be shown)
          </p>
        </CardContent>
      </Card>

      {/* Featured Stores Section */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Stores Section</CardTitle>
          <CardDescription>Select stores for the "Featured Stores" section</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {stores.map((store) => (
              <div key={store.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`featured-${store.id}`}
                  checked={selectedFeaturedStores.includes(store.id)}
                  onCheckedChange={() => toggleStore(store.id, 'featured')}
                />
                <label
                  htmlFor={`featured-${store.id}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {store.name}
                </label>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Selected: {selectedFeaturedStores.length} (If empty, random 6 stores will be shown)
          </p>
        </CardContent>
      </Card>

      {/* Top Stores Section */}
      <Card>
        <CardHeader>
          <CardTitle>Top Stores Section</CardTitle>
          <CardDescription>Select stores for the "Top Stores" section</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {stores.map((store) => (
              <div key={store.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`top-${store.id}`}
                  checked={selectedTopStores.includes(store.id)}
                  onCheckedChange={() => toggleStore(store.id, 'top')}
                />
                <label
                  htmlFor={`top-${store.id}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {store.name}
                </label>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Selected: {selectedTopStores.length} (If empty, first 8 stores will be shown)
          </p>
        </CardContent>
      </Card>

      {/* Popular Stores Section */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Stores Section</CardTitle>
          <CardDescription>Select stores for the "Popular Stores" section</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {stores.map((store) => (
              <div key={store.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`popular-${store.id}`}
                  checked={selectedPopularStores.includes(store.id)}
                  onCheckedChange={() => toggleStore(store.id, 'popular')}
                />
                <label
                  htmlFor={`popular-${store.id}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {store.name}
                </label>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Selected: {selectedPopularStores.length} (If empty, all stores will be shown)
          </p>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Save Homepage Settings
        </Button>
      </div>
    </div>
  );
}