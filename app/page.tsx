// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import CouponCard from "@/components/CouponCard";
import StoreCard from "@/components/StoreCard";
import { generateSEO } from "@/components/SEO";
import { stores, coupons, blogPosts } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = generateSEO({
  title: "Online Coupons and Promo Codes",
  description: "Find the best coupons and discount codes at DealHub. Save money with verified promo codes from top stores.",
  keywords: "coupons, discounts, deals, promo codes, savings",
  canonical: "/",
});

export default function Home() {
  const activeCoupons = coupons.filter(
    (c) => c.active && (!c.expiryDate || new Date(c.expiryDate) > new Date())
  );

  const heroStores = stores.slice(0, 8);
  const featuredStores = stores.slice(0, 8);
  const topStores = stores.slice(0, 8);
  const featuredBlogPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      {/* Hero Section with Title and Store Logos */}
      <section className="py-12 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
            Online Coupons and Promo Codes
          </h1>

          {/* Featured Store Logos Grid */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-8">
            {heroStores.map((store) => (
              <Link key={store.id} href={`/store/${store.slug}`}>
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200 cursor-pointer aspect-square flex items-center justify-center">
                  {store.logo.startsWith('http') ? (
                    <img 
                      src={store.logo} 
                      alt={store.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-4xl">{store.logo}</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Top Coupons */}
      <section className="py-12 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Today's Top Coupons and Discount Codes
            </h2>
            <p className="text-gray-600 italic text-sm">
              Wadav.com is where all the coupons and deals come along, discover the extraordinary things that may include deal in coupons.
            </p>
          </div>

          <div className="space-y-4">
            {activeCoupons.length > 0 ? (
              activeCoupons.map((coupon) => (
                <CouponCard
                  key={coupon.id}
                  {...coupon}
                  storeUrl={stores.find(s => s.slug === coupon.storeSlug)?.url || `https://${coupon.storeSlug}.com`}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-600 text-lg">
                  No coupons available right now. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-900">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBlogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full cursor-pointer bg-white border-gray-200">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold mb-2 hover:text-[#6b5d4f] transition-colors line-clamp-2 text-gray-900">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Top Stores - Text Links */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-900">
            Our Top Stores
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
            {topStores.map((store) => (
              <Link
                key={store.id}
                href={`/store/${store.slug}`}
                className="text-gray-700 hover:text-[#6b5d4f] transition-colors font-medium py-2"
              >
                {store.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Stores */}
      <section className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-900">
            Popular Stores
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
            {stores.map((store) => (
              <Link
                key={store.id}
                href={`/store/${store.slug}`}
                className="text-gray-700 hover:text-[#6b5d4f] transition-colors font-medium py-2"
              >
                {store.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Alphabetical Store Index */}
      <section className="py-8 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-sm text-gray-600">
            <span className="font-semibold">Coupon Stores by Letter:</span>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('').map((letter) => (
                <Link
                  key={letter}
                  href={`/stores?letter=${letter}`}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-[#6b5d4f] hover:text-white hover:border-[#6b5d4f] transition-colors"
                >
                  {letter}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}