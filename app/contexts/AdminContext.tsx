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

interface AdminContextType {
  coupons: Coupon[];
  stores: Store[];
  blogPosts: BlogPost[];
  categories: Category[];
  siteSettings: SiteSettings;
  homePageSettings: HomePageSettings;
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
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({} as SiteSettings);
  const [homePageSettings, setHomePageSettings] = useState<HomePageSettings>({} as HomePageSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize data from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load coupons
      const savedCoupons = localStorage.getItem('admin_coupons');
      setCoupons(savedCoupons ? JSON.parse(savedCoupons) : mockCoupons);

      // Load stores
      const savedStores = localStorage.getItem('admin_stores');
      setStores(savedStores ? JSON.parse(savedStores) : mockStores);

      // Load blog posts
      const savedBlogPosts = localStorage.getItem('admin_blog_posts');
      setBlogPosts(savedBlogPosts ? JSON.parse(savedBlogPosts) : mockBlogPosts);

      // Load categories
      const savedCategories = localStorage.getItem('admin_categories');
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
      setCategories(savedCategories ? JSON.parse(savedCategories) : defaultCategories);

      // Load site settings
      const savedSiteSettings = localStorage.getItem('admin_site_settings');
      const defaultSiteSettings = {
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
      
      if (savedSiteSettings) {
        const parsed = JSON.parse(savedSiteSettings);
        setSiteSettings({
          ...defaultSiteSettings,
          ...parsed,
          socialMedia: { ...defaultSiteSettings.socialMedia, ...parsed.socialMedia },
          pageMeta: {
            home: { ...defaultSiteSettings.pageMeta.home, ...parsed.pageMeta?.home },
            stores: { ...defaultSiteSettings.pageMeta.stores, ...parsed.pageMeta?.stores },
            blog: { ...defaultSiteSettings.pageMeta.blog, ...parsed.pageMeta?.blog },
            about: { ...defaultSiteSettings.pageMeta.about, ...parsed.pageMeta?.about },
            contact: { ...defaultSiteSettings.pageMeta.contact, ...parsed.pageMeta?.contact }
          },
          categoryContent: { ...defaultSiteSettings.categoryContent, ...parsed.categoryContent }
        });
      } else {
        setSiteSettings(defaultSiteSettings);
      }

      // Load home page settings
      const savedHomePageSettings = localStorage.getItem('admin_homepage_settings');
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
      setHomePageSettings(savedHomePageSettings ? JSON.parse(savedHomePageSettings) : defaultHomePageSettings);

      setIsInitialized(true);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('admin_coupons', JSON.stringify(coupons));
    }
  }, [coupons, isInitialized]);

  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('admin_stores', JSON.stringify(stores));
    }
  }, [stores, isInitialized]);

  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('admin_blog_posts', JSON.stringify(blogPosts));
    }
  }, [blogPosts, isInitialized]);

  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('admin_categories', JSON.stringify(categories));
    }
  }, [categories, isInitialized]);

  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('admin_site_settings', JSON.stringify(siteSettings));
    }
  }, [siteSettings, isInitialized]);

  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('admin_homepage_settings', JSON.stringify(homePageSettings));
    }
  }, [homePageSettings, isInitialized]);

  const addCoupon = (coupon: Coupon) => {
    setCoupons([...coupons, { ...coupon, clickCount: 0 }]);
  };

  const updateCoupon = (id: string, updatedCoupon: Partial<Coupon>) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, ...updatedCoupon } : c));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter(c => c.id !== id));
  };

  const addStore = (store: Store) => {
    setStores([...stores, store]);
  };

  const updateStore = (id: string, updatedStore: Partial<Store>) => {
    setStores(stores.map(s => s.id === id ? { ...s, ...updatedStore } : s));
  };

  const deleteStore = (id: string) => {
    setStores(stores.filter(s => s.id !== id));
  };

  const addBlogPost = (post: BlogPost) => {
    setBlogPosts([...blogPosts, post]);
  };

  const updateBlogPost = (id: string, updatedPost: Partial<BlogPost>) => {
    setBlogPosts(blogPosts.map(p => p.id === id ? { ...p, ...updatedPost } : p));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(blogPosts.filter(p => p.id !== id));
  };

  const addCategory = (category: Category) => {
    setCategories([...categories, category]);
  };

  const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
    setCategories(categories.map(c => c.id === id ? { ...c, ...updatedCategory } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings({ ...siteSettings, ...settings });
  };

  const updateHomePageSettings = (settings: Partial<HomePageSettings>) => {
    setHomePageSettings({ ...homePageSettings, ...settings });
  };

  const incrementCouponClick = (id: string) => {
    setCoupons(coupons.map(c => 
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

  return (
    <AdminContext.Provider
      value={{
        coupons,
        stores,
        blogPosts,
        categories,
        siteSettings,
        homePageSettings,
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