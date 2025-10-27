// components/SEO.tsx
import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export function generateSEO({
  title,
  description,
  keywords,
  ogImage = "/placeholder.svg",
  canonical,
}: SEOProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dealhub.com";
  const fullTitle = `${title} | DealHub`;
  const canonicalUrl = canonical
    ? `${siteUrl}${canonical.startsWith("/") ? "" : "/"}${canonical}`
    : siteUrl;

  return {
    title: fullTitle,
    description,
    keywords,
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      images: [{ url: `${siteUrl}${ogImage}` }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: `${siteUrl}${ogImage}`,
    },
    alternates: { canonical: canonicalUrl },
  };
}