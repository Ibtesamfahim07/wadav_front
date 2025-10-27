// // app/store/[slug]/StorePageClient.tsx
// "use client";

// import { useEffect } from "react";
// import CouponCard from "@/components/CouponCard";
// import { coupons } from "@/lib/data";
// import { trackPageView } from "@/app/utils/analytics";
// import { generateStoreSchema, generateBreadcrumbSchema } from "@/app/utils/structuredData";

// export default function StorePageClient({ store }: { store: any }) {
//   const storeCoupons = coupons.filter(
//     (c: any) => c.store === store.name && c.active
//   );

//   useEffect(() => {
//     trackPageView(`/store/${store.slug}`, `${store.name} Coupons`);
//   }, [store]);

//   const storeSchema = generateStoreSchema(store);
//   const breadcrumbSchema = generateBreadcrumbSchema([
//     { name: "Home", url: "/" },
//     { name: "Stores", url: "/stores" },
//     { name: store.name, url: `/store/${store.slug}` },
//   ]);

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Structured Data */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify([storeSchema, breadcrumbSchema]),
//         }}
//       />

      

//       <main className="flex-1 py-12 px-4">
//         <div className="container mx-auto max-w-5xl">
//           <div className="flex items-center gap-4 mb-6">
//             <img
//               src={store.logo}
//               alt={store.name}
//               className="w-16 h-16 object-contain"
//             />
//             <div>
//               <h1 className="text-3xl font-bold">{store.name} Coupons</h1>
//               <p className="text-muted-foreground">{storeCoupons.length} active deals</p>
//             </div>
//           </div>

//           <div className="space-y-6">
//             {storeCoupons.length > 0 ? (
//               storeCoupons.map((coupon: any) => (
//                 <CouponCard
//                   key={coupon.id}
//                   {...coupon}
//                   storeUrl={store.url}
//                 />
//               ))
//             ) : (
//               <p className="text-center text-muted-foreground py-12">
//                 No active coupons right now. Check back soon!
//               </p>
//             )}
//           </div>
//         </div>
//       </main>

      
//     </div>
//   );
// }