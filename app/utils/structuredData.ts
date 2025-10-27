// app/utils/structuredData.ts
export const generateCouponSchema = (coupon: {
  title: string;
  description: string;
  code: string;
  discount: string;
  storeName: string;
  expiryDate?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Offer",
  name: coupon.title,
  description: coupon.description,
  url: coupon.url,
  price: "0",
  priceCurrency: "USD",
  availability: "https://schema.org/InStock",
  priceValidUntil: coupon.expiryDate,
  seller: {
    "@type": "Organization",
    name: coupon.storeName,
  },
  discount: coupon.discount,
  promoCode: coupon.code,
});

export const generateStoreSchema = (store: {
  name: string;
  description: string;
  logo: string;
  website: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: store.name,
  description: store.description,
  image: store.logo,
  url: store.website,
});

export const generateArticleSchema = (article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  image: article.image,
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  author: {
    "@type": "Person",
    name: article.author,
  },
  publisher: {
    "@type": "Organization",
    name: "DealHub",
    logo: {
      "@type": "ImageObject",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/placeholder.svg`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": article.url,
  },
});

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DealHub",
  description: "Find the best coupons, deals, and discounts from top stores",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});