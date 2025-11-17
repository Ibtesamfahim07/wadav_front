// app/admin/settings/page.tsx
'use client';

import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const DEFAULT_SETTINGS = {
  siteTitle: '',
  siteDescription: '',
  affiliateDisclaimer: '',
  socialMedia: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
  pageMeta: {
    home: { title: '', description: '', keywords: '' },
    stores: { title: '', description: '', keywords: '' },
    blog: { title: '', description: '', keywords: '' },
    about: { title: '', description: '', keywords: '' },
    contact: { title: '', description: '', keywords: '' },
  },
  categoryContent: {
    fashion: { description: '', featuredStores: [], relatedCategories: [] },
    electronics: { description: '', featuredStores: [], relatedCategories: [] },
    beauty: { description: '', featuredStores: [], relatedCategories: [] },
  },
};

export default function SettingsPage() {
  const { siteSettings, updateSiteSettings } = useAdmin();
  const [formData, setFormData] = useState(siteSettings || DEFAULT_SETTINGS);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
    toast({ title: 'Settings updated successfully' });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold">Site Settings</h2>
        <p className="text-muted-foreground">Manage site-wide settings and configurations</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Basic site information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="siteTitle">Site Title</Label>
              <Input
                id="siteTitle"
                value={formData.siteTitle || ''}
                onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={formData.siteDescription || ''}
                onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                rows={3}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="affiliateDisclaimer">Affiliate Disclaimer</Label>
              <Textarea
                id="affiliateDisclaimer"
                value={formData.affiliateDisclaimer || ''}
                onChange={(e) => setFormData({ ...formData, affiliateDisclaimer: e.target.value })}
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
            <CardDescription>Configure social media links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input
                id="facebook"
                value={formData.socialMedia?.facebook || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  socialMedia: { ...formData.socialMedia, facebook: e.target.value }
                })}
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input
                id="instagram"
                value={formData.socialMedia?.instagram || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  socialMedia: { ...formData.socialMedia, instagram: e.target.value }
                })}
                placeholder="https://instagram.com/yourpage"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input
                id="twitter"
                value={formData.socialMedia?.twitter || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  socialMedia: { ...formData.socialMedia, twitter: e.target.value }
                })}
                placeholder="https://twitter.com/yourpage"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Page SEO Meta Tags</CardTitle>
            <CardDescription>Customize meta titles and descriptions for each page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Home Page Meta */}
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-3">Home Page</h4>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label>Meta Title</Label>
                  <Input
                    value={formData.pageMeta?.home?.title || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pageMeta: {
                        ...formData.pageMeta,
                        home: { ...formData.pageMeta?.home, title: e.target.value }
                      }
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    value={formData.pageMeta?.home?.description || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pageMeta: {
                        ...formData.pageMeta,
                        home: { ...formData.pageMeta?.home, description: e.target.value }
                      }
                    })}
                    rows={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Keywords</Label>
                  <Input
                    value={formData.pageMeta?.home?.keywords || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pageMeta: {
                        ...formData.pageMeta,
                        home: { ...formData.pageMeta?.home, keywords: e.target.value }
                      }
                    })}
                  />
                </div>
              </div>
            </div>
            {/* Stores Page Meta */}
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-3">Stores Page</h4>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label>Meta Title</Label>
                  <Input
                    value={formData.pageMeta?.stores?.title || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pageMeta: {
                        ...formData.pageMeta,
                        stores: { ...formData.pageMeta?.stores, title: e.target.value }
                      }
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    value={formData.pageMeta?.stores?.description || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pageMeta: {
                        ...formData.pageMeta,
                        stores: { ...formData.pageMeta?.stores, description: e.target.value }
                      }
                    })}
                    rows={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Keywords</Label>
                  <Input
                    value={formData.pageMeta?.stores?.keywords || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pageMeta: {
                        ...formData.pageMeta,
                        stores: { ...formData.pageMeta?.stores, keywords: e.target.value }
                      }
                    })}
                  />
                </div>
              </div>
            </div>
            {/* Blog Page Meta */}
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-3">Blog Page</h4>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label>Meta Title</Label>
                  <Input
                    value={formData.pageMeta?.blog?.title || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pageMeta: {
                        ...formData.pageMeta,
                        blog: { ...formData.pageMeta?.blog, title: e.target.value }
                      }
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    value={formData.pageMeta?.blog?.description || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pageMeta: {
                        ...formData.pageMeta,
                        blog: { ...formData.pageMeta?.blog, description: e.target.value }
                      }
                    })}
                    rows={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Keywords</Label>
                  <Input
                    value={formData.pageMeta?.blog?.keywords || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pageMeta: {
                        ...formData.pageMeta,
                        blog: { ...formData.pageMeta?.blog, keywords: e.target.value }
                      }
                    })}
                  />
                </div>
              </div>
            </div>
            {/* About Page Meta */}
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-3">About Page</h4>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label>Meta Title</Label>
                  <Input
                    value={formData.pageMeta?.about?.title || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pageMeta: {
                        ...formData.pageMeta,
                        about: { ...formData.pageMeta?.about, title: e.target.value }
                      }
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    value={formData.pageMeta?.about?.description || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pageMeta: {
                        ...formData.pageMeta,
                        about: { ...formData.pageMeta?.about, description: e.target.value }
                      }
                    })}
                    rows={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Keywords</Label>
                  <Input
                    value={formData.pageMeta?.about?.keywords || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pageMeta: {
                        ...formData.pageMeta,
                        about: { ...formData.pageMeta?.about, keywords: e.target.value }
                      }
                    })}
                  />
                </div>
              </div>
            </div>
            {/* Contact Page Meta */}
            <div className="pb-4">
              <h4 className="font-semibold mb-3">Contact Page</h4>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label>Meta Title</Label>
                  <Input
                    value={formData.pageMeta?.contact?.title || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pageMeta: {
                        ...formData.pageMeta,
                        contact: { ...formData.pageMeta?.contact, title: e.target.value }
                      }
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    value={formData.pageMeta?.contact?.description || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pageMeta: {
                        ...formData.pageMeta,
                        contact: { ...formData.pageMeta?.contact, description: e.target.value }
                      }
                    })}
                    rows={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Keywords</Label>
                  <Input
                    value={formData.pageMeta?.contact?.keywords || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pageMeta: {
                        ...formData.pageMeta,
                        contact: { ...formData.pageMeta?.contact, keywords: e.target.value }
                      }
                    })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Content</CardTitle>
            <CardDescription>Customize content for category pages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Fashion Category */}
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-3">Fashion Category</h4>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.categoryContent?.fashion?.description || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      categoryContent: {
                        ...formData.categoryContent,
                        fashion: {
                          ...formData.categoryContent?.fashion,
                          description: e.target.value,
                          featuredStores: formData.categoryContent?.fashion?.featuredStores || [],
                          relatedCategories: formData.categoryContent?.fashion?.relatedCategories || []
                        }
                      }
                    })}
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Related Categories (comma separated)</Label>
                  <Input
                    value={formData.categoryContent?.fashion?.relatedCategories?.join(', ') || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      categoryContent: {
                        ...formData.categoryContent,
                        fashion: {
                          ...formData.categoryContent?.fashion,
                          description: formData.categoryContent?.fashion?.description || '',
                          featuredStores: formData.categoryContent?.fashion?.featuredStores || [],
                          relatedCategories: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        }
                      }
                    })}
                    placeholder="Beauty, Sports"
                  />
                </div>
              </div>
            </div>

            {/* Electronics Category */}
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-3">Electronics Category</h4>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.categoryContent?.electronics?.description || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      categoryContent: {
                        ...formData.categoryContent,
                        electronics: {
                          ...formData.categoryContent?.electronics,
                          description: e.target.value,
                          featuredStores: formData.categoryContent?.electronics?.featuredStores || [],
                          relatedCategories: formData.categoryContent?.electronics?.relatedCategories || []
                        }
                      }
                    })}
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Related Categories (comma separated)</Label>
                  <Input
                    value={formData.categoryContent?.electronics?.relatedCategories?.join(', ') || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      categoryContent: {
                        ...formData.categoryContent,
                        electronics: {
                          ...formData.categoryContent?.electronics,
                          description: formData.categoryContent?.electronics?.description || '',
                          featuredStores: formData.categoryContent?.electronics?.featuredStores || [],
                          relatedCategories: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        }
                      }
                    })}
                    placeholder="Home, Sports"
                  />
                </div>
              </div>
            </div>

            {/* Beauty Category */}
            <div className="pb-4">
              <h4 className="font-semibold mb-3">Beauty Category</h4>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.categoryContent?.beauty?.description || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      categoryContent: {
                        ...formData.categoryContent,
                        beauty: {
                          ...formData.categoryContent?.beauty,
                          description: e.target.value,
                          featuredStores: formData.categoryContent?.beauty?.featuredStores || [],
                          relatedCategories: formData.categoryContent?.beauty?.relatedCategories || []
                        }
                      }
                    })}
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Related Categories (comma separated)</Label>
                  <Input
                    value={formData.categoryContent?.beauty?.relatedCategories?.join(', ') || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      categoryContent: {
                        ...formData.categoryContent,
                        beauty: {
                          ...formData.categoryContent?.beauty,
                          description: formData.categoryContent?.beauty?.description || '',
                          featuredStores: formData.categoryContent?.beauty?.featuredStores || [],
                          relatedCategories: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        }
                      }
                    })}
                    placeholder="Fashion, Food"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" size="lg">Save Settings</Button>
      </form>
    </div>
  );
}