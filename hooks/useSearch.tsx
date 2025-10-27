// app/hooks/useSearch.ts
import { useState, useMemo } from "react";

export type SortOption = "newest" | "popular" | "expiring";

export const useSearch = <T extends Record<string, any>>(
  items: T[],
  searchFields: (keyof T)[]
) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filteredAndSorted = useMemo(() => {
    let filtered = items;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        searchFields.some((field) => {
          const value = item[field];
          return value && String(value).toLowerCase().includes(query);
        })
      );
    }

    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    const sorted = [...filtered];
    switch (sortBy) {
      case "popular":
        sorted.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
        break;
      case "expiring":
        sorted.sort((a, b) => {
          const dateA = a.expiryDate ? new Date(a.expiryDate).getTime() : Infinity;
          const dateB = b.expiryDate ? new Date(b.expiryDate).getTime() : Infinity;
          return dateA - dateB;
        });
        break;
      case "newest":
      default:
        sorted.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
    }

    return sorted;
  }, [items, searchQuery, category, sortBy, searchFields]);

  return {
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    sortBy,
    setSortBy,
    results: filteredAndSorted,
  };
};