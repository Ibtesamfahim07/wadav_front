// app/about/page.tsx
import { Metadata } from "next";
import { generateSEO } from "@/components/SEO";
import Link from "next/link";

export const metadata: Metadata = generateSEO({
  title: "About DealHub",
  description: "Get anything you want on the internet, for less. Discover valid discount coupons and save money on your favorite products.",
  canonical: "/about",
  keywords: "about dealhub, coupon site, deals platform, discounts, money-saving",
});

export default function AboutPage() {
  const brands = [
    "Microsoft", "EXPRESS", "amazon", "KOHLS", "Walmart", "backcountry", 
    "ULTA", "verizon", "NINE", "adidas", "Norton", "by Symantec", "Crocs", 
    "AEROPOSTALE", "Nutrfsystem", "Caribbean", "PHS", "SHOP", "JUSTTAB", "NORDSTROM"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">About DealHub</h1>
        <p className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Get anything you want on the internet, for less.
        </p>
        <p className="text-lg text-gray-600 text-center leading-relaxed">
          Get more out of your hard-earned money when you shop for products and experiences online. 
          Our mission is to stretch your dollar further by being a go-to place for valid discount 
          coupons you can use instantly. Become steps ahead of other online shoppers and discover 
          a budget-friendly way to get what you want from the internet.
        </p>
      </section>

      {/* Instant Access Section */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Instant access to thousands of deals.
        </h2>
        <div className="text-gray-600 leading-relaxed space-y-4">
          <p>
            Deals often come as time-sensitive offers. So we made it possible for you to get instant 
            access to discounts and coupons wherever and whenever. Simply download our app and discover 
            all the coupons and deals waiting for you.
          </p>
          <p>
            No need to access your computer because we are making it super easy for you to get the 
            discounts you want when you want them.
          </p>
        </div>
      </section>

      {/* Easy Saving Section */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          DealHub offers nothing but the easiest way to save even while on the go.
        </h2>
        <div className="text-gray-600 leading-relaxed space-y-4">
          <p>
            Deals and discounts don't wait for anyone. With DealHub, you never have to spend time 
            and energy browsing the internet for discount coupons. We have searched and verified 
            them all for your convenience.
          </p>
          <p>
            All you have to do is shop for what you want for less.
          </p>
          <p>
            Right at this moment, people are saving money with deals they found on our platform. 
            And we don't want you missing out on all the fun.
          </p>
          <p className="font-semibold">
            Go ahead, join the community and discover deals and discounts instantly. Create your 
            account and download the app now!
          </p>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="p-4 text-center border rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="font-medium text-gray-800">{brand}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            SO, WHAT ARE YOU WAITING FOR?
          </h2>
          <p className="text-2xl font-semibold mb-8">
            COME AND JOIN US!
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            CONTACT US
          </Link>
        </div>
      </section>

    
    </div>
  );
}