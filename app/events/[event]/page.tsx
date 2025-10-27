
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO } from "@/components/SEO";
import Link from "next/link";
import Image from "next/image";
import { coupons } from "@/lib/data";

interface EventPageProps {
  params: {
    event: string;
  };
}

// Generate static params for all events
export async function generateStaticParams() {
  const events = [
    "halloween", // Add halloween here
    "mothers-day", 
    "labor-day",
    "fathers-day",
    "black-friday",
    "cyber-monday",
    "christmas"
  ];

  return events.map((event) => ({
    event: event,
  }));
}

// Event names mapping
const eventNames: Record<string, string> = {
  "halloween": "Halloween", // Make sure halloween is here
  "mothers-day": "Mother's Day",
  "labor-day": "Labor Day", 
  "fathers-day": "Father's Day",
  "black-friday": "Black Friday",
  "cyber-monday": "Cyber Monday",
  "christmas": "Christmas",
};

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const eventName = eventNames[params.event] || "Special Event";
  
  return generateSEO({
    title: `${eventName} Deals & Coupons`,
    description: `Find the best ${eventName} deals and coupon codes. Save big on your favorite brands during ${eventName}.`,
    canonical: `/events/${params.event}`,
    keywords: `${eventName}, deals, coupons, discounts`,
  });
}

export default function EventPage({ params }: EventPageProps) {
  const eventName = eventNames[params.event];
  
  if (!eventName) {
    notFound();
  }

  // Filter coupons for the event (you can modify this logic based on your data structure)
  const eventCoupons = coupons.filter(coupon => coupon.active);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      

      <main className="max-w-6xl mx-auto py-8 px-4">
        {/* Event Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{eventName} Deals & Coupons</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover exclusive {eventName} deals and save big on your favorite products
          </p>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {eventCoupons.map((coupon) => (
            <div key={coupon.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              {/* Store Image */}
              <div className="relative h-48 w-full bg-gray-100">
                <Image
                  src={coupon.image}
                  alt={coupon.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Coupon Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{coupon.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{coupon.store}</p>
                  </div>
                  <div className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                    {coupon.discount} OFF
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{coupon.description}</p>

                <div className="flex items-center justify-between">
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors">
                    GET CODE
                  </button>
                  
                  {coupon.expiryDate && (
                    <span className="text-xs text-gray-500">
                      Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Halloween Content */}
        {params.event === "halloween" && (
          <section className="bg-orange-50 border border-orange-200 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-center">🎃 Halloween Special Offers 🎃</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">Costume Deals</h3>
                <p className="text-gray-600">Save up to 50% on Halloween costumes and accessories</p>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">Candy & Decor</h3>
                <p className="text-gray-600">Get discounts on candy, decorations, and party supplies</p>
              </div>
            </div>
          </section>
        )}
      </main>

      
    </div>
  );
}