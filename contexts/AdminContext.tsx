// contexts/AdminContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockCoupons, mockStores, mockBlogPosts } from '@/lib/data';

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
  faqs?: { question: string; answer: string; }[];
  similarStores?: string[];
  popularCoupons?: string;
  trustContent?: string;
  customerSavings?: string;
  verifiedSavings?: string;
  competitorPricing?: string;
  priceComparison?: { item: string; withCoupon: string; withoutCoupon: string; savings: string; }[];
  expertTips?: string;
  benefits?: string;
  whyUseCoupons?: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  tableOfContents?: { title: string; id: string; }[];
  relatedPosts?: string[];
  additionalSections?: { title: string; content: string; }[];
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
  storeId?: string; // ← NEW: links user to a store
}

interface AdminContextType {
  coupons: Coupon[];
  stores: Store[];
  blogPosts: BlogPost[];
  categories: Category[];
  siteSettings: SiteSettings;
  homePageSettings: HomePageSettings;
  users: User[];
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  addStore: (store: Store) => void;
  updateStore: (id: string, store: Partial<Store>) => void;
  deleteStore: (id: string) => void;
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  updateHomePageSettings: (settings: Partial<HomePageSettings>) => void;
  incrementCouponClick: (id: string) => void;
  getCouponAnalytics: () => any[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    if (typeof window === 'undefined') return mockCoupons;
    const saved = localStorage.getItem('admin_coupons');
    return saved ? JSON.parse(saved) : mockCoupons;
  });

  const [stores, setStores] = useState<Store[]>(() => {
    if (typeof window === 'undefined') return mockStores;
    const saved = localStorage.getItem('admin_stores');
    return saved ? JSON.parse(saved) : mockStores;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    if (typeof window === 'undefined') return mockBlogPosts;
    const saved = localStorage.getItem('admin_blog_posts');
    return saved ? JSON.parse(saved) : mockBlogPosts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('admin_categories');
    const defaultCategories = [
      { id: '1', name: 'Appliances', slug: 'appliances' },
      { id: '2', name: 'Arts & Crafts', slug: 'arts-crafts' },
      { id: '3', name: 'Automotive', slug: 'automotive' },
      { id: '4', name: 'Babies & Kids', slug: 'babies-kids' },
      { id: '5', name: 'Books & Magazines', slug: 'books-magazines' },
      { id: '6', name: 'Business & Services', slug: 'business-services' },
      { id: '7', name: 'Clothing & Accessories', slug: 'clothing-accessories' },
      { id: '8', name: 'Computer & Networking', slug: 'computer-networking' },
      { id: '9', name: 'Department Stores', slug: 'department-stores' },
      { id: '10', name: 'Education', slug: 'education' },
      { id: '11', name: 'Electronics', slug: 'electronics' },
      { id: '12', name: 'Fashion', slug: 'fashion' },
      { id: '13', name: 'Food & Drinks', slug: 'food-drinks' },
      { id: '14', name: 'Games', slug: 'games' },
      { id: '15', name: 'Gifts & Collectibles', slug: 'gifts-collectibles' },
      { id: '16', name: 'Health & Beauty', slug: 'health-beauty' },
      { id: '17', name: 'Home & Improvement', slug: 'home-improvement' },
      { id: '18', name: 'Office & Workplace', slug: 'office-workplace' },
      { id: '19', name: 'Pets', slug: 'pets' },
      { id: '20', name: 'Sports & Outdoors', slug: 'sports-outdoors' },
      { id: '21', name: 'Tools & Hardware', slug: 'tools-hardware' },
      { id: '22', name: 'Travel', slug: 'travel' },
    ];
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    if (typeof window === 'undefined') return {} as SiteSettings;
    const saved = localStorage.getItem('admin_site_settings');
    const defaultSettings = {
      siteTitle: 'DealHub',
      siteDescription: 'Find the best coupon codes, deals, and discounts from top brands.',
      affiliateDisclaimer: 'If You Buy A Product Or Service After Clicking One Of Our Links On This Page, We May Be Paid A Commission.',
      socialMedia: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
      },
      pageMeta: {
        home: {
          title: 'Online Coupons and Promo Codes',
          description: 'Find the best coupon codes, deals, and discounts from top brands. Save money on your favorite stores with verified promo codes.',
          keywords: 'coupons, deals, discounts, promo codes, savings',
          ogImage: '/placeholder.svg'
        },
        stores: {
          title: 'All Stores',
          description: 'Browse coupons and deals from all your favorite stores.',
          keywords: 'stores, brands, retailers, coupons',
          ogImage: '/placeholder.svg'
        },
        blog: {
          title: 'Savings Blog',
          description: 'Expert tips, guides, and strategies to help you save more on everything you buy',
          keywords: 'savings tips, shopping guides, money saving',
          ogImage: '/placeholder.svg'
        },
        about: {
          title: 'About Us',
          description: 'Learn more about our mission to help you save money.',
          keywords: 'about, company, mission',
          ogImage: '/placeholder.svg'
        },
        contact: {
          title: 'Contact Us',
          description: 'Get in touch with our team.',
          keywords: 'contact, support, help',
          ogImage: '/placeholder.svg'
        }
      },
      categoryContent: {
        fashion: {
          description: 'Get the latest fashion deals on Clothing & Accessories at DealHub. Discover top brands and more with incredible discounts.',
          featuredStores: [],
          relatedCategories: ['Beauty', 'Sports']
        },
        electronics: {
          description: 'Find the best deals on electronics, gadgets, and tech products from leading brands.',
          featuredStores: [],
          relatedCategories: ['Home', 'Sports']
        },
        beauty: {
          description: 'Save on beauty products, cosmetics, and skincare with exclusive coupon codes.',
          featuredStores: [],
          relatedCategories: ['Fashion', 'Food']
        }
      }
    };

    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultSettings,
        ...parsed,
        socialMedia: { ...defaultSettings.socialMedia, ...parsed.socialMedia },
        pageMeta: {
          home: { ...defaultSettings.pageMeta.home, ...parsed.pageMeta?.home },
          stores: { ...defaultSettings.pageMeta.stores, ...parsed.pageMeta?.stores },
          blog: { ...defaultSettings.pageMeta.blog, ...parsed.pageMeta?.blog },
          about: { ...defaultSettings.pageMeta.about, ...parsed.pageMeta?.about },
          contact: { ...defaultSettings.pageMeta.contact, ...parsed.pageMeta?.contact }
        },
        categoryContent: { ...defaultSettings.categoryContent, ...parsed.categoryContent }
      };
    }
    return defaultSettings;
  });

  const [homePageSettings, setHomePageSettings] = useState<HomePageSettings>(() => {
    if (typeof window === 'undefined') return {} as HomePageSettings;
    const saved = localStorage.getItem('admin_homepage_settings');
    const defaultHomePageSettings = {
      heroTitle: 'Online Coupons and Promo Codes',
      heroDescription: 'Dealhub.com curates offers for brands we think you\'ll love. When you buy through our links, we may earn a commission.',
      featuredStoreIds: [],
      featuredCouponIds: [],
      featuredBlogPostIds: [],
      topStoreIds: [],
      popularStoreIds: [],
      maxCouponsDisplay: 12,
    };
    return saved ? JSON.parse(saved) : defaultHomePageSettings;
  });

  const [users, setUsers] = useState<User[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('admin_users');
    return saved ? JSON.parse(saved) : [];
  });

  // === PERSIST TO LOCALSTORAGE (ALL IN ONE EFFECT) ===
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_coupons', JSON.stringify(coupons));
      localStorage.setItem('admin_stores', JSON.stringify(stores));
      localStorage.setItem('admin_blog_posts', JSON.stringify(blogPosts));
      localStorage.setItem('admin_categories', JSON.stringify(categories));
      localStorage.setItem('admin_site_settings', JSON.stringify(siteSettings));
      localStorage.setItem('admin_homepage_settings', JSON.stringify(homePageSettings));
      localStorage.setItem('admin_users', JSON.stringify(users));
    }
  }, [coupons, stores, blogPosts, categories, siteSettings, homePageSettings, users]);

  // === CRUD OPERATIONS ===
  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [...prev, { ...coupon, clickCount: 0 }]);
  };

  const updateCoupon = (id: string, updatedCoupon: Partial<Coupon>) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...updatedCoupon } : c));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  const addStore = (store: Store) => {
    setStores(prev => [...prev, store]);
  };

  const updateStore = (id: string, updatedStore: Partial<Store>) => {
    setStores(prev => prev.map(s => s.id === id ? { ...s, ...updatedStore } : s));
  };

  const deleteStore = (id: string) => {
    setStores(prev => prev.filter(s => s.id !== id));
  };

  const addBlogPost = (post: BlogPost) => {
    setBlogPosts(prev => [...prev, post]);
  };

  const updateBlogPost = (id: string, updatedPost: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(p => p.id === id ? { ...p, ...updatedPost } : p));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  const addCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
  };

  const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updatedCategory } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...settings }));
  };

  const updateHomePageSettings = (settings: Partial<HomePageSettings>) => {
    setHomePageSettings(prev => ({ ...prev, ...settings }));
  };

  const incrementCouponClick = (id: string) => {
    setCoupons(prev => prev.map(c =>
      c.id === id ? { ...c, clickCount: (c.clickCount || 0) + 1 } : c
    ));
  };

  const getCouponAnalytics = () => {
    return coupons
      .map(c => ({
        id: c.id,
        title: c.title,
        store: c.store,
        clickCount: c.clickCount || 0,
        usageCount: c.usageCount || 0,
      }))
      .sort((a, b) => b.clickCount - a.clickCount)
      .slice(0, 10);
  };

  // === USER OPERATIONS ===
  const addUser = (user: Omit<User, 'id'>) => {
    setUsers(prev => [...prev, { id: Date.now().toString(), ...user }]);
  };

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updatedUser } : u));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        coupons,
        stores,
        blogPosts,
        categories,
        siteSettings,
        homePageSettings,
        users,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        addStore,
        updateStore,
        deleteStore,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addCategory,
        updateCategory,
        deleteCategory,
        updateSiteSettings,
        updateHomePageSettings,
        incrementCouponClick,
        getCouponAnalytics,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};