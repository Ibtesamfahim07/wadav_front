// app/components/Navbar.tsx
"use client";

import { Search, Menu, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { stores } from "@/lib/data";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCouponsOpen, setIsCouponsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const categories = [
    { name: "Appliances", slug: "appliances" },
    { name: "Arts & Crafts", slug: "arts-crafts" },
    { name: "Automotive", slug: "automotive" },
    { name: "Babies & Kids", slug: "babies-kids" },
    { name: "Books & Magazines", slug: "books-magazines" },
    { name: "Business & Services", slug: "business-services" },
    { name: "Clothing & Accessories", slug: "clothing-accessories" },
    { name: "Computer & Networking", slug: "computer-networking" },
    { name: "Department Stores", slug: "department-stores" },
    { name: "Education", slug: "education" },
    { name: "Electronics", slug: "electronics" },
    { name: "Fashion", slug: "fashion" },
    { name: "Food & Drinks", slug: "food-drinks" },
    { name: "Games", slug: "games" },
    { name: "Gifts & Collectibles", slug: "gifts-collectibles" },
    { name: "Health & Beauty", slug: "health-beauty" },
    { name: "Home & Improvement", slug: "home-improvement" },
    { name: "Office & Workplace", slug: "office-workplace" },
    { name: "Pets", slug: "pets" },
    { name: "Sports & Outdoors", slug: "sports-outdoors" },
    { name: "Tools & Hardware", slug: "tools-hardware" },
    { name: "Travel", slug: "travel" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-wide" style={{ color: '#6b5d4f' }}>
              DEALHUB
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Coupons Dropdown */}
            <div className="relative group">
              <button
                className="text-sm uppercase flex items-center gap-1 text-gray-700 hover:text-[#6b5d4f] transition-colors py-2"
                onMouseEnter={() => setIsCouponsOpen(true)}
                onMouseLeave={() => setIsCouponsOpen(false)}
              >
                COUPONS <ChevronDown className="h-3 w-3" />
              </button>
              
              {isCouponsOpen && (
                <div 
                  className="absolute left-0 top-full mt-0 w-[900px] bg-white border border-gray-200 shadow-lg rounded-md p-6 max-h-[500px] overflow-y-auto z-50"
                  onMouseEnter={() => setIsCouponsOpen(true)}
                  onMouseLeave={() => setIsCouponsOpen(false)}
                >
                  <div className="grid grid-cols-4 gap-x-8 gap-y-3">
                    {stores.map((store) => (
                      <Link
                        key={store.id}
                        href={`/store/${store.slug}`}
                        className="text-sm text-gray-700 hover:text-[#6b5d4f] transition-colors py-1 block"
                        onClick={() => setIsCouponsOpen(false)}
                      >
                        › {store.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link
                      href="/stores"
                      className="text-sm font-semibold hover:text-[#6b5d4f] transition-colors text-gray-900"
                      onClick={() => setIsCouponsOpen(false)}
                    >
                      › All Stores
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                className="text-sm uppercase flex items-center gap-1 text-gray-700 hover:text-[#6b5d4f] transition-colors py-2"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                CATEGORIES <ChevronDown className="h-3 w-3" />
              </button>
              
              {isCategoriesOpen && (
                <div 
                  className="absolute left-0 top-full mt-0 w-[700px] bg-white border border-gray-200 shadow-lg rounded-md p-6 z-50"
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                >
                  <div className="grid grid-cols-3 gap-x-8 gap-y-3">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="text-sm text-gray-700 hover:text-[#6b5d4f] transition-colors block"
                        onClick={() => setIsCategoriesOpen(false)}
                      >
                        › {cat.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link
                      href="/categories"
                      className="text-sm font-semibold hover:text-[#6b5d4f] transition-colors text-gray-900"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      › All Categories
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:block">
            <div className="relative">
              <Input
                type="search"
                placeholder="SEARCH ON DEALHUB.COM"
                className="w-72 pl-10 pr-4 h-10 text-sm border-gray-300 focus:border-[#6b5d4f] focus:ring-[#6b5d4f]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200 animate-fade-in">
            <Link
              href="/"
              className="block px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/stores"
              className="block px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Stores
            </Link>
            <Link
              href="/categories"
              className="block px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}