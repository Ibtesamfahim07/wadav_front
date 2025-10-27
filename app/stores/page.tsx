import { Metadata } from "next";
import StoreCard from "@/components/StoreCard";
import { stores } from "@/lib/data";
import { generateSEO } from "@/components/SEO";

export const metadata: Metadata = generateSEO({
  title: "All Stores",
  description: "Browse all stores and find exclusive deals from top brands",
  canonical: "/stores",
});

export default function StoresPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">All Stores</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stores.map(store => <StoreCard key={store.id} {...store} />)}
      </div>
    </div>
  );
}
