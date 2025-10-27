// utils/stores.ts
export type Store = {
  slug: string;
  name: string;
  // ... other fields
};

// Mock data – replace with real DB/CMS later
const STORES: Store[] = [
  { slug: 'nike', name: 'Nike' },
  { slug: 'adidas', name: 'Adidas' },
  { slug: 'puma', name: 'Puma' },
  // add all your stores here
];

export async function getAllStoreSlugs(): Promise<string[]> {
  return STORES.map((s) => s.slug);
}

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  return STORES.find((s) => s.slug === slug) || null;
}