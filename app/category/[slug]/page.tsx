// app/category/[slug]/page.tsx
import { stores, coupons } from "@/lib/data";
import { Metadata } from "next";
import CouponCard from "@/components/CouponCard";
import Link from "next/link";
import { notFound } from "next/navigation";

// Define all valid categories with full names
const categoryData: { [key: string]: { name: string; description: string } } = {
  "automotive": {
    name: "Automotive",
    description: "Rev up your savings in the automotive coupon category at Wadav. Score incredible discounts on top automotive brands like Firestone, Jiffy Lube & more with budget-smart brands like Walmart, Tire Rack. Whether you need auto parts, car accessories, or maintenance services, Wadav covers you!"
  },
  "electronics": {
    name: "Electronics",
    description: "Find the best deals on electronics including laptops, tablets, smartphones, TVs, and more. Save big with verified coupons and promo codes."
  },
  "fashion": {
    name: "Fashion",
    description: "Discover amazing fashion deals on clothing, shoes, accessories, and more. Get the latest trends for less with our exclusive coupons."
  },
  "home-improvement": {
    name: "Home & Improvement",
    description: "Save on home improvement projects with coupons for furniture, decor, tools, and more."
  },
  "health-beauty": {
    name: "Health & Beauty",
    description: "Get the best deals on beauty products, skincare, makeup, and health supplements."
  },
  "food-drinks": {
    name: "Food & Drinks",
    description: "Save on restaurants, meal delivery, groceries, and beverages with our verified coupons."
  },
  // Add more categories as needed
};

// Featured stores for categories
const featuredStores = [
  { name: "Corporate Coupons", slug: "corporate" },
  { name: "Atl Coupons", slug: "atl" },
  { name: "Nxurun Coupons", slug: "nxurun" },
  { name: "Sonline-Goods Coupons", slug: "sonline-goods" },
  { name: "Auto Path Coupons", slug: "auto-path" },
  { name: "Starbucks Keyless Coupons", slug: "starbucks" },
  { name: "Trw Petiet Coupons", slug: "trw-petiet" },
  { name: "Ginger Cane Coupons", slug: "ginger-cane" },
  { name: "Cilian Coupons", slug: "cilian" },
  { name: "Burger Masterpiece Coupons", slug: "burger-masterpiece" },
  { name: "Soccer Phenomenon Coupons", slug: "soccer" },
  { name: "Brew Oil Orange Coupons", slug: "brew-oil" },
];

const relatedCategories = [
  { name: "Deals, Vehicles", slug: "deals-vehicles" },
  { name: "Car Electronics & GPS", slug: "car-electronics" },
  { name: "Motorcycles & Powersports", slug: "motorcycles" },
  { name: "Car Wash", slug: "car-wash" },
  { name: "Auto Parts & Tools", slug: "auto-parts" },
  { name: "Tires & Wheels", slug: "tires-wheels" },
  { name: "Truck Parts & Accessories", slug: "truck-parts" },
  { name: "Auto Accessories", slug: "auto-accessories" },
  { name: "Auto Repair Services", slug: "auto-repair" },
];

// Generate static params
export async function generateStaticParams() {
  return Object.keys(categoryData).map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = categoryData[params.slug];

  if (!category) {
    return {
      title: "Category Not Found | DealHub",
      description: "The requested category does not exist.",
    };
  }

  return {
    title: `Top ${category.name} Coupons and Discount Codes | DealHub`,
    description: category.description,
  };
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = categoryData[params.slug];

  if (!category) {
    notFound();
  }

  // Filter coupons by category
  const categoryCoupons = coupons.filter(
    (coupon) => coupon.active
  ).slice(0, 15); // Show first 15 coupons

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">
            Top {category.name} Coupons and Discount Codes
          </h1>
          <p className="text-sm text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            {category.description}
          </p>
        </div>

        {/* Our Featured Coupons Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Our Featured Coupons
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Wadav.com curates offers for anyone and most part free, when you pay through our links, we may earn a commission.
          </p>
          
          <div className="space-y-4">
            {categoryCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                {...coupon}
                storeUrl={stores.find(s => s.slug === coupon.storeSlug)?.url || `https://${coupon.storeSlug}.com`}
              />
            ))}
          </div>
        </section>

        {/* Our Featured Stores Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Our Featured Stores
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
            {featuredStores.map((store) => (
              <Link
                key={store.slug}
                href={`/store/${store.slug}`}
                className="text-sm text-gray-700 hover:text-[#6b5d4f] transition-colors py-2"
              >
                {store.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Related Categories Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Related Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
            {relatedCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="text-sm text-gray-700 hover:text-[#6b5d4f] transition-colors py-2"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>

        
      </div>
    </div>
  );
}