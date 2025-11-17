// contexts/AdminContext.tsx
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { mockCoupons, mockStores } from '@/lib/data';

// ──────────────────────────────────────────────────────────────
// INTERFACES
// ──────────────────────────────────────────────────────────────

interface Coupon {
  id: string;
  code: string;
  title: string;
  discount: string;
  description: string;
  expiryDate?: string;
  store: string;
  storeLogo: string;
  storeUrl: string;
  verified?: boolean;
  usageCount?: number;
  active?: boolean;
  category: string;
  clickCount?: number;
  type: 'code' | 'link';
}

interface Store {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  category: string;
  couponsCount: number;
  url: string;
  aboutStore?: string;
  howToApply?: string;
  whyChoose?: string;
  faqs?: { question: string; answer: string }[];
  similarStores?: string[];
  popularCoupons?: string;
  trustContent?: string;
  customerSavings?: string;
  verifiedSavings?: string;
  competitorPricing?: string;
  priceComparison?: {
    item: string;
    withCoupon: string;
    withoutCoupon: string;
    savings: string;
  }[];
  expertTips?: string;
  benefits?: string;
  whyUseCoupons?: string;
}

interface BlogAuthor {
  authorId: number;
  fullName: string;
  email?: string;
  bio?: string;
  profilePic?: string;
  socialTwitter?: string;
  socialLinkedin?: string;
  socialFacebook?: string;
  socialInstagram?: string;
  createdAt: string;
  _count?: { posts: number };
}

interface BlogCategory {
  categoryId: number;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  _count?: { posts: number };
}

interface BlogTag {
  tagId: number;
  name: string;
  slug: string;
  createdAt: string;
  _count?: { posts: number };
}

interface BlogPost {
  postId: number;
  authorId: number;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  slug: string;
  status: 'draft' | 'published' | 'scheduled';
  isFeatured: boolean;
  views: number;
  metaTitle?: string;
  metaDescription?: string;
  publishDate?: string;
  createdAt: string;
  updatedAt: string;
  categoryId?: number;
  author?: BlogAuthor;
  primaryCategory?: BlogCategory;
  categories?: BlogCategory[];
  tags?: BlogTag[];
  _count?: { comments: number };
}

interface BlogComment {
  commentId: number;
  postId: number;
  commenterName: string;
  commenterEmail: string;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  commentedAt: string;
  post?: { title: string };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface PageMeta {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
}

interface HomePageSettings {
  heroTitle: string;
  heroDescription: string;
  featuredStoreIds: string[];
  featuredCouponIds: string[];
  featuredBlogPostIds: string[];
  topStoreIds: string[];
  popularStoreIds: string[];
  maxCouponsDisplay: number;
}

interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  affiliateDisclaimer: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  pageMeta: {
    home: PageMeta;
    stores: PageMeta;
    blog: PageMeta;
    about: PageMeta;
    contact: PageMeta;
  };
  categoryContent: {
    [key: string]: {
      description: string;
      featuredStores: string[];
      relatedCategories: string[];
    };
  };
}

interface User {
  id: string;
  name: string;
  password: string;
  storeId?: string;
}

// ──────────────────────────────────────────────────────────────
// CONTEXT TYPE
// ──────────────────────────────────────────────────────────────

interface AdminContextType {
  coupons: Coupon[];
  stores: Store[];
  categories: Category[];
  siteSettings: SiteSettings;
  homePageSettings: HomePageSettings;
  users: User[];
  blogAuthors: BlogAuthor[];
  blogCategories: BlogCategory[];
  blogTags: BlogTag[];
  blogPosts: BlogPost[];
  blogComments: BlogComment[];

  // Coupon
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  incrementCouponClick: (id: string) => void;
  getCouponAnalytics: () => any[];

  // Store
  addStore: (store: Store) => void;
  updateStore: (id: string, store: Partial<Store>) => void;
  deleteStore: (id: string) => void;

  // Category
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Settings
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  updateHomePageSettings: (settings: Partial<HomePageSettings>) => void;

  // Users
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;

  // Blog: Authors
  fetchBlogAuthors: (search?: string) => Promise<void>;
  createBlogAuthor: (data: FormData) => Promise<void>;
  updateBlogAuthor: (authorId: number, data: FormData) => Promise<void>;
  deleteBlogAuthor: (authorId: number) => Promise<void>;

  // Blog: Categories
  fetchBlogCategories: (search?: string) => Promise<void>;
  createBlogCategory: (data: any) => Promise<void>;
  updateBlogCategory: (categoryId: number, data: any) => Promise<void>;
  deleteBlogCategory: (categoryId: number) => Promise<void>;

  // Blog: Tags
  fetchBlogTags: (search?: string) => Promise<void>;
  createBlogTag: (data: any) => Promise<void>;
  updateBlogTag: (tagId: number, data: any) => Promise<void>;
  deleteBlogTag: (tagId: number) => Promise<void>;

  // Blog: Posts
  fetchBlogPosts: (search?: string) => Promise<void>;
  createBlogPost: (data: FormData) => Promise<void>;
  updateBlogPost: (postId: number, data: FormData) => Promise<void>;
  deleteBlogPost: (postId: number) => Promise<void>;

  // Blog: Comments
  fetchBlogComments: (postId?: number) => Promise<void>;
  updateBlogComment: (commentId: number, data: any) => Promise<void>;
  deleteBlogComment: (commentId: number) => Promise<void>;
}

// ──────────────────────────────────────────────────────────────
// CONTEXT & PROVIDER
// ──────────────────────────────────────────────────────────────

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const API_BASE = 'http://https://wadavback1-6iy0oc8nt-totutoti727-5984s-projects.vercel.app//api';

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  // ──────────────────────── STATE ────────────────────────
  const [coupons, setCoupons] = useState<Coupon[]>(() =>
    typeof window !== 'undefined' && localStorage.getItem('admin_coupons')
      ? JSON.parse(localStorage.getItem('admin_coupons')!)
      : mockCoupons
  );

  const [stores, setStores] = useState<Store[]>(() =>
    typeof window !== 'undefined' && localStorage.getItem('admin_stores')
      ? JSON.parse(localStorage.getItem('admin_stores')!)
      : mockStores
  );

  const [categories, setCategories] = useState<Category[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('admin_categories');
    const defaults = [
      { id: '1', name: 'Appliances', slug: 'appliances' },
      { id: '2', name: 'Arts & Crafts', slug: 'arts-crafts' },
      // ... (all 22 categories)
    ];
    return saved ? JSON.parse(saved) : defaults;
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    if (typeof window === 'undefined') return {} as SiteSettings;
    const saved = localStorage.getItem('admin_site_settings');
    const defaults = { /* ... full default object */ };
    return saved ? JSON.parse(saved) : defaults;
  });

  const [homePageSettings, setHomePageSettings] = useState<HomePageSettings>(() => {
    if (typeof window === 'undefined') return {} as HomePageSettings;
    const saved = localStorage.getItem('admin_homepage_settings');
    const defaults = {
      heroTitle: 'Online Coupons and Promo Codes',
      heroDescription: 'Dealhub.com curates offers...',
      featuredStoreIds: [],
      featuredCouponIds: [],
      featuredBlogPostIds: [],
      topStoreIds: [],
      popularStoreIds: [],
      maxCouponsDisplay: 12,
    };
    return saved ? JSON.parse(saved) : defaults;
  });

  const [users, setUsers] = useState<User[]>(() =>
    typeof window !== 'undefined' && localStorage.getItem('admin_users')
      ? JSON.parse(localStorage.getItem('admin_users')!)
      : []
  );

  // Blog States
  const [blogAuthors, setBlogAuthors] = useState<BlogAuthor[]>([]);
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [blogTags, setBlogTags] = useState<BlogTag[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogComments, setBlogComments] = useState<BlogComment[]>([]);

  // ──────────────────────── LOCAL STORAGE SYNC ────────────────────────
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_coupons', JSON.stringify(coupons));
      localStorage.setItem('admin_stores', JSON.stringify(stores));
      localStorage.setItem('admin_categories', JSON.stringify(categories));
      localStorage.setItem('admin_site_settings', JSON.stringify(siteSettings));
      localStorage.setItem('admin_homepage_settings', JSON.stringify(homePageSettings));
      localStorage.setItem('admin_users', JSON.stringify(users));
    }
  }, [coupons, stores, categories, siteSettings, homePageSettings, users]);

  // ──────────────────────── COUPON OPS ────────────────────────
  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev, { ...coupon, clickCount: 0 }]);
  };

  const updateCoupon = (id: string, updated: Partial<Coupon>) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const incrementCouponClick = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, clickCount: (c.clickCount || 0) + 1 } : c
      )
    );
  };

  const getCouponAnalytics = () => {
    return coupons
      .map((c) => ({
        id: c.id,
        title: c.title,
        store: c.store,
        clickCount: c.clickCount || 0,
        usageCount: c.usageCount || 0,
      }))
      .sort((a, b) => b.clickCount - a.clickCount)
      .slice(0, 10);
  };

  // ──────────────────────── STORE OPS ────────────────────────
  const addStore = (store: Store) => setStores((prev) => [...prev, store]);
  const updateStore = (id: string, updated: Partial<Store>) =>
    setStores((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
  const deleteStore = (id: string) =>
    setStores((prev) => prev.filter((s) => s.id !== id));

  // ──────────────────────── CATEGORY OPS ────────────────────────
  const addCategory = (cat: Category) =>
    setCategories((prev) => [...prev, cat]);
  const updateCategory = (id: string, updated: Partial<Category>) =>
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  const deleteCategory = (id: string) =>
    setCategories((prev) => prev.filter((c) => c.id !== id));

  // ──────────────────────── SETTINGS ────────────────────────
  const updateSiteSettings = (settings: Partial<SiteSettings>) =>
    setSiteSettings((prev) => ({ ...prev, ...settings }));
  const updateHomePageSettings = (settings: Partial<HomePageSettings>) =>
    setHomePageSettings((prev) => ({ ...prev, ...settings }));

  // ──────────────────────── USER OPS ────────────────────────
  const addUser = (user: Omit<User, 'id'>) =>
    setUsers((prev) => [...prev, { id: Date.now().toString(), ...user }]);
  const updateUser = (id: string, updated: Partial<User>) =>
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updated } : u))
    );
  const deleteUser = (id: string) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  // ──────────────────────── BLOG: AUTHORS ────────────────────────
  const fetchBlogAuthors = async (search?: string) => {
    const url = search
      ? `${API_BASE}/admin/blog/authors-simple?search=${search}`
      : `${API_BASE}/admin/blog/authors-simple`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.success) setBlogAuthors(data.data);
  };

  const createBlogAuthor = async (formData: FormData) => {
    const res = await fetch(`${API_BASE}/admin/blog/authors-simple`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    await fetchBlogAuthors();
  };

  const updateBlogAuthor = async (authorId: number, formData: FormData) => {
    const res = await fetch(`${API_BASE}/admin/blog/authors-simple/${authorId}`, {
      method: 'PUT',
      body: formData,
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    await fetchBlogAuthors();
  };

  const deleteBlogAuthor = async (authorId: number) => {
    const res = await fetch(`${API_BASE}/admin/blog/authors-simple/${authorId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    await fetchBlogAuthors();
  };

  // ──────────────────────── BLOG: CATEGORIES ────────────────────────
  const fetchBlogCategories = async (search?: string) => {
    const url = search
      ? `${API_BASE}/admin/blog/categories-simple?search=${search}`
      : `${API_BASE}/admin/blog/categories-simple`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.success) setBlogCategories(data.data);
  };

  const createBlogCategory = async (data: any) => {
    const res = await fetch(`${API_BASE}/admin/blog/categories-simple`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const d = await res.json();
    if (!d.success) throw new Error(d.message);
    await fetchBlogCategories();
  };

  const updateBlogCategory = async (categoryId: number, data: any) => {
    const res = await fetch(`${API_BASE}/admin/blog/categories-simple/${categoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const d = await res.json();
    if (!d.success) throw new Error(d.message);
    await fetchBlogCategories();
  };

  const deleteBlogCategory = async (categoryId: number) => {
    const res = await fetch(`${API_BASE}/admin/blog/categories-simple/${categoryId}`, {
      method: 'DELETE',
    });
    const d = await res.json();
    if (!d.success) throw new Error(d.message);
    await fetchBlogCategories();
  };

  // ──────────────────────── BLOG: TAGS ────────────────────────
  const fetchBlogTags = async (search?: string) => {
    const url = search
      ? `${API_BASE}/admin/blog/tags-simple?search=${search}`
      : `${API_BASE}/admin/blog/tags-simple`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.success) setBlogTags(data.data);
  };

  const createBlogTag = async (data: any) => {
    const res = await fetch(`${API_BASE}/admin/blog/tags-simple`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const d = await res.json();
    if (!d.success) throw new Error(d.message);
    await fetchBlogTags();
  };

  const updateBlogTag = async (tagId: number, data: any) => {
    const res = await fetch(`${API_BASE}/admin/blog/tags-simple/${tagId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const d = await res.json();
    if (!d.success) throw new Error(d.message);
    await fetchBlogTags();
  };

  const deleteBlogTag = async (tagId: number) => {
    const res = await fetch(`${API_BASE}/admin/blog/tags-simple/${tagId}`, {
      method: 'DELETE',
    });
    const d = await res.json();
    if (!d.success) throw new Error(d.message);
    await fetchBlogTags();
  };

  // ──────────────────────── BLOG: POSTS ────────────────────────
  const fetchBlogPosts = async (search?: string) => {
    const url = search
      ? `${API_BASE}/admin/admin/blog/posts-simple?search=${search}`
      : `${API_BASE}/admin/blog/posts-simple`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.success) setBlogPosts(data.data);
  };

  const createBlogPost = async (formData: FormData) => {
    const res = await fetch(`${API_BASE}/admin/blog/posts-simple`, {
      method: 'POST',
      body: formData,
    });
    const d = await res.json();
    if (!d.success) throw new Error(d.message);
    await fetchBlogPosts();
  };

  const updateBlogPost = async (postId: number, formData: FormData) => {
    const res = await fetch(`${API_BASE}/admin/blog/posts-simple/${postId}`, {
      method: 'PUT',
      body: formData,
    });
    const d = await res.json();
    if (!d.success) throw new Error(d.message);
    await fetchBlogPosts();
  };

  const deleteBlogPost = async (postId: number) => {
    const res = await fetch(`${API_BASE}/admin/blog/posts-simple/${postId}`, {
      method: 'DELETE',
    });
    const d = await res.json();
    if (!d.success) throw new Error(d.message);
    await fetchBlogPosts();
  };

  // ──────────────────────── BLOG: COMMENTS ────────────────────────
  const fetchBlogComments = async (postId?: number) => {
    const url = postId
      ? `${API_BASE}/admin/blog/comments-simple?postId=${postId}`
      : `${API_BASE}/admin/blog/comments-simple`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.success) setBlogComments(data.data);
  };

  const updateBlogComment = async (commentId: number, data: any) => {
    const res = await fetch(`${API_BASE}/admin/blog/comments-simple/${commentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const d = await res.json();
    if (!d.success) throw new Error(d.message);
    await fetchBlogComments();
  };

  const deleteBlogComment = async (commentId: number) => {
    const res = await fetch(`${API_BASE}/admin/blog/comments-simple/${commentId}`, {
      method: 'DELETE',
    });
    const d = await res.json();
    if (!d.success) throw new Error(d.message);
    await fetchBlogComments();
  };

  // ──────────────────────── PROVIDER RETURN ────────────────────────
  return (
    <AdminContext.Provider
      value={{
        // Data
        coupons,
        stores,
        categories,
        siteSettings,
        homePageSettings,
        users,
        blogAuthors,
        blogCategories,
        blogTags,
        blogPosts,
        blogComments,

        // Coupon
        addCoupon,
        updateCoupon,
        deleteCoupon,
        incrementCouponClick,
        getCouponAnalytics,

        // Store
        addStore,
        updateStore,
        deleteStore,

        // Category
        addCategory,
        updateCategory,
        deleteCategory,

        // Settings
        updateSiteSettings,
        updateHomePageSettings,

        // Users
        addUser,
        updateUser,
        deleteUser,

        // Blog: Authors
        fetchBlogAuthors,
        createBlogAuthor,
        updateBlogAuthor,
        deleteBlogAuthor,

        // Blog: Categories
        fetchBlogCategories,
        createBlogCategory,
        updateBlogCategory,
        deleteBlogCategory,

        // Blog: Tags
        fetchBlogTags,
        createBlogTag,
        updateBlogTag,
        deleteBlogTag,

        // Blog: Posts
        fetchBlogPosts,
        createBlogPost,
        updateBlogPost,
        deleteBlogPost,

        // Blog: Comments
        fetchBlogComments,
        updateBlogComment,
        deleteBlogComment,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// ──────────────────────── HOOK ────────────────────────
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};