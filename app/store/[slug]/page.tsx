// app/store/[slug]/page.tsx
import { stores, coupons } from "@/lib/data";
import { Metadata } from "next";
import CouponCard from "@/components/CouponCard";

// Generate static params for all stores
export async function generateStaticParams() {
  return stores.map((store) => ({
    slug: store.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const store = stores.find((s) => s.slug === params.slug);

  if (!store) {
    return {
      title: "Store Not Found | DealHub",
      description: "The requested store does not exist.",
    };
  }

  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return {
    title: `$25 Off ${store.name} Coupons & Promo Codes for ${currentMonth}`,
    description: `Save with verified ${store.name} promo codes and deals.`,
    openGraph: {
      title: `${store.name} Coupons`,
      description: store.description,
      images: [store.logo],
    },
  };
}

// Main Page Component
export default function StorePage({
  params,
}: {
  params: { slug: string };
}) {
  const store = stores.find((s) => s.slug === params.slug);

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Store Not Found</h1>
          <p className="text-muted-foreground">The requested store does not exist.</p>
        </div>
      </div>
    );
  }

  const storeCoupons = coupons.filter(
    (c) => c.store === store.name && c.active
  );

  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: store.name,
    description: store.description,
    url: store.url,
    logo: store.logo,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Stores", item: "/stores" },
      { "@type": "ListItem", position: 3, name: store.name, item: `/store/${store.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([storeSchema, breadcrumbSchema]),
        }}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <aside className="w-64 flex-shrink-0">
            {/* Store Logo */}
            <div className="bg-white border rounded-lg p-4 mb-6">
              <img
                src={store.logo}
                alt={`${store.name} logo`}
                className="w-full h-auto object-contain mb-3"
              />
              <div className="text-center text-sm text-gray-600">
                ✓ {storeCoupons.length} Offers Available
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-white border rounded-lg p-4 mb-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Based on user history, we have found the following offer through our Ads, but, you can use any of our coupons.
              </p>
            </div>

            {/* Stats Section */}
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3">Stats Inboxhero Offers</h3>
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
                <span className="text-xs text-gray-600 ml-2">Rated 4.5 / 5 by 3 users</span>
              </div>
            </div>

            {/* Inboxhero Coupon Stats */}
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3">Inboxhero Coupon Stats</h3>
              <p className="text-xs text-gray-600 mb-3">
                Based on actual history, we have found the following stats for Inboxhero coupons:
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">💰 Avg earnings:</span>
                  <span className="font-bold">$25</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">🎯 Best Coupons:</span>
                  <span className="font-bold text-green-600">25% OFF</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">📊 TOTAL CODES:</span>
                  <span className="font-bold">{storeCoupons.length}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">💾 PEN OFFER:</span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">💚 AVERAGE SAVING:</span>
                  <span className="font-bold">$0</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-4 text-xs">
              <div>
                <p className="font-bold mb-1">Inboxhero Promo code</p>
                <p className="text-gray-600">
                  Our expert added the code <span className="font-bold">30ECAR</span> as a new coupon at inboxhero.io 19 days ago
                </p>
              </div>

              <div>
                <p className="font-bold mb-1">Inboxhero Promo code</p>
                <p className="text-gray-600">
                  Our expert added the code <span className="font-bold">30ECAR</span> as a new coupon at Inboxhero.io 19 days ago
                </p>
              </div>

              <div>
                <p className="font-bold mb-1">A blogger spot this code</p>
                <p className="text-gray-600">
                  A blogger spot the code <span className="font-bold">30ECAR</span> worked 14 days ago
                </p>
              </div>

              <div>
                <p className="font-bold mb-1">Inboxhero Promo code</p>
                <p className="text-gray-600">
                  Our expert added the code <span className="font-bold">30ECAR</span> as a new coupon at Inboxhero.io 18 days ago
                </p>
              </div>

              <div>
                <p className="font-bold mb-1">A shopper at United States</p>
                <p className="text-gray-600">
                  A shopper at United States used the code <span className="font-bold">30ECAR</span> at inboxhero.io 9 days ago
                </p>
              </div>

              <div>
                <p className="font-bold mb-1">A shopper Confirmed the code</p>
                <p className="text-gray-600">
                  A shopper Confirmed the code <span className="font-bold">30ECAR</span> is working coupons at Inboxhero.io 16 days ago
                </p>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="mt-6">
              <h3 className="font-bold text-sm mb-3">TRY OUR 4 BEST INBOXHERO COUPONS</h3>
              <div className="bg-white border rounded p-2">
                <div className="text-xs text-gray-600 mb-2">Inboxhero coupon views graphs for Oct 2025:</div>
                <div className="flex items-end justify-between h-20">
                  {[20, 45, 30, 60, 35, 50, 25, 40, 55, 30].map((height, i) => (
                    <div 
                      key={i} 
                      className="w-2 bg-blue-400 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>10</span>
                  <span>20</span>
                  <span>30</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">
                $25 Off {store.name} Coupons & Promo Codes for {currentMonth}
              </h1>
              <p className="text-sm text-gray-600">
                This page contains {storeCoupons.length} {store.name} coupon codes and {storeCoupons.length} deals for October. Most redeemed at{" "}
                <a href={store.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener">
                  {store.url.replace('https://', '').replace('http://', '')}
                </a>.
              </p>
            </div>

            {/* Coupons List */}
            <div className="space-y-4 mb-8">
              {storeCoupons.length > 0 ? (
                storeCoupons.map((coupon) => (
                  <CouponCard
                    key={coupon.id}
                    {...coupon}
                    storeUrl={store.url}
                  />
                ))
              ) : (
                <div className="bg-white rounded-lg border p-12 text-center">
                  <p className="text-gray-600">No active coupons right now. Check back soon!</p>
                </div>
              )}
            </div>

            {/* Category Tags */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-white border rounded-full text-sm hover:bg-gray-50">
                  💰 Online deals
                </button>
                <button className="px-4 py-2 bg-white border rounded-full text-sm hover:bg-gray-50">
                  🎯 Online Shopping
                </button>
                <button className="px-4 py-2 bg-white border rounded-full text-sm hover:bg-gray-50">
                  🛍️ Shopping
                </button>
                <button className="px-4 py-2 bg-white border rounded-full text-sm hover:bg-gray-50">
                  📧 Online service
                </button>
                <button className="px-4 py-2 bg-white border rounded-full text-sm hover:bg-gray-50">
                  💼 Coupon
                </button>
                <button className="px-4 py-2 bg-white border rounded-full text-sm hover:bg-gray-50">
                  🎁 Voucher
                </button>
                <button className="px-4 py-2 bg-white border rounded-full text-sm hover:bg-gray-50">
                  🛒 Shopping
                </button>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg border p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Inboxhero Frequently Asked Questions</h2>
              
              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                Welcome to the Inboxhero page on Wadav.com, here you can find the biggest available collection of Inboxhero coupons and online codes. We have 6 Inboxhero coupons and 6 coupons in total. I promise you it is genuine and you can find a variety of coupon deals for Inboxhero.
              </p>

              <div className="space-y-3">
                <details className="border-b pb-3">
                  <summary className="font-medium cursor-pointer text-sm hover:text-blue-600">
                    What are the Inboxhero latest coupon codes?
                  </summary>
                  <p className="text-sm text-gray-600 mt-2 pl-4">
                    Check the coupons listed above for the latest {store.name} promo codes and deals.
                  </p>
                </details>

                <details className="border-b pb-3">
                  <summary className="font-medium cursor-pointer text-sm hover:text-blue-600">
                    What amount can I save on average using Inboxhero coupon codes?
                  </summary>
                  <p className="text-sm text-gray-600 mt-2 pl-4">
                    Based on user history, customers typically save between $15-50 when using verified {store.name} coupons.
                  </p>
                </details>

                <details className="border-b pb-3">
                  <summary className="font-medium cursor-pointer text-sm hover:text-blue-600">
                    How can I be notified about the latest coupon codes for Inboxhero?
                  </summary>
                  <p className="text-sm text-gray-600 mt-2 pl-4">
                    Bookmark this page and check back regularly for new {store.name} deals and promo codes.
                  </p>
                </details>

                <details className="border-b pb-3">
                  <summary className="font-medium cursor-pointer text-sm hover:text-blue-600">
                    I'm an absolute noob. Please guide me how to use the codes?
                  </summary>
                  <p className="text-sm text-gray-600 mt-2 pl-4">
                    Click on "Get Coupon Code" button above, copy the code, visit {store.name}, and paste it at checkout.
                  </p>
                </details>

                <details className="border-b pb-3">
                  <summary className="font-medium cursor-pointer text-sm hover:text-blue-600">
                    Can I submit a Inboxhero coupon code?
                  </summary>
                  <p className="text-sm text-gray-600 mt-2 pl-4">
                    Yes! Contact us to share working {store.name} coupon codes with the community.
                  </p>
                </details>
              </div>

              <div className="mt-6 flex gap-2">
                <span className="text-xs text-gray-500">Similar to:</span>
                <a href="#" className="text-xs text-blue-600 hover:underline">E-commerce & Marketing</a>
                <a href="#" className="text-xs text-blue-600 hover:underline">E-commerce & Online stores</a>
                <a href="#" className="text-xs text-blue-600 hover:underline">Inboxhero coupons code</a>
              </div>
            </div>

            {/* About Author Section */}
            <div className="bg-white rounded-lg border p-6 mb-8">
              <div className="flex gap-4">
                <img
                  src="https://ui-avatars.com/api/?name=Jay+Kakade&size=80"
                  alt="Author"
                  className="w-20 h-20 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-bold mb-1">Jay Kakade</h3>
                  <p className="text-sm text-gray-600 mb-3">Content & Strategy Lead at Wadav</p>
                  
                  <h4 className="font-bold text-sm mb-2">About Inboxhero Coupons</h4>
                  <p className="text-xs text-gray-700 leading-relaxed mb-3">
                    I am regular user of {store.name} through our site, and I am happy to see great amount of savings through {store.name} coupons. But I will say that you should check all the coupons before placing any order at {store.name}. Most importantly, you can see the recent offers, sales, and discounts on Wadav. You can use this information to make the most of your savings. Check all the active coupons & deals for each category at Wadav, you might find more than one coupons to save the highest at Wadav.
                  </p>

                  <div className="space-y-2 text-xs text-gray-700">
                    <p>
                      <span className="font-medium">💡 I gave an example of this</span> - Yesterday I was checking for Wadav promo codes, just so I can save a few dollars. I found 5 promo codes for Wadav. People use coupons are really happy & saving a lot of money while placing my orders. I believe similar benefits to you in % OFF Inboxhero coupons codes you find on Wadav at Wadav.
                    </p>

                    <p className="font-medium">Did you participate with Inboxhero coupons for Grads?</p>
                    
                    <p>
                      Shopping at Inboxhero? We give you verified and 99% discount on the first purchase—coupon code, promo code, deals, offer, and it is 100% FREE.
                    </p>

                    <p>
                      If you like Inboxhero coupons, I have some important points. You can quickly filter today's latest coupons and deals like today's best offers by verified only offer & deals at Inboxhero with an Inboxhero coupon code. Also, you can easily order by best offer, expiring soon, newest coupons. It works, they are verified so they are 99% discount on the first purchase coupon at Inboxhero.
                    </p>

                    <p>
                      If you like Inboxhero coupons, then please bookmark this page—that way you don't miss any coupon event. You can identify the new promo codes by today's best offers & Inboxhero promo codes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Stores */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-bold mb-4">Similar Stores</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <a href="#" className="text-blue-600 hover:underline">Grammarly Coupons</a>
                <a href="#" className="text-blue-600 hover:underline">HeySpace Coupons</a>
                <a href="#" className="text-blue-600 hover:underline">I-lovehost Coupons</a>
                <a href="#" className="text-blue-600 hover:underline">Vault Coupons</a>
                <a href="#" className="text-blue-600 hover:underline">Happyprize Coupons</a>
                <a href="#" className="text-blue-600 hover:underline">HelpFirst Coupons</a>
                <a href="#" className="text-blue-600 hover:underline">Anothro Coupons</a>
                <a href="#" className="text-blue-600 hover:underline">Rare Coupons</a>
                <a href="#" className="text-blue-600 hover:underline">Dropified Coupons</a>
                <a href="#" className="text-blue-600 hover:underline">Lead14 Iviest Core Coupons</a>
                <a href="#" className="text-blue-600 hover:underline">Ebates Coupons</a>
                <a href="#" className="text-blue-600 hover:underline">Ixellerate Coupons</a>
                <a href="#" className="text-blue-600 hover:underline">CPA Automation Studios Coupons</a>
                <a href="#" className="text-blue-600 hover:underline">Macro Coupons</a>
                <a href="#" className="text-blue-600 hover:underline">Farberge Coupons</a>
                <a href="#" className="text-blue-600 hover:underline">Vault All</a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-white border rounded text-xs hover:bg-gray-50">
                  💰 Classroom Items
                </button>
                <button className="px-3 py-1 bg-white border rounded text-xs hover:bg-gray-50">
                  🛍️ Shopping
                </button>
                <button className="px-3 py-1 bg-white border rounded text-xs hover:bg-gray-50">
                  🎁 Online shopping
                </button>
                <button className="px-3 py-1 bg-white border rounded text-xs hover:bg-gray-50">
                  📧 Newsletter
                </button>
                <button className="px-3 py-1 bg-white border rounded text-xs hover:bg-gray-50">
                  💼 Coupon
                </button>
                <button className="px-3 py-1 bg-white border rounded text-xs hover:bg-gray-50">
                  🛒 Shopping
                </button>
                <button className="px-3 py-1 bg-white border rounded text-xs hover:bg-gray-50">
                  🎯 Discount
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}