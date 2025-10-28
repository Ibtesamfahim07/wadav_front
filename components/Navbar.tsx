// components/Navbar.tsx
"use client";

import { Search, Menu, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
        <div className="flex items-center h-16 gap-8">

          {/* Logo - Left */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <span className="text-2xl font-bold tracking-wide" style={{ color: '#6b5d4f' }}>
              DEALHUB
            </span>
          </Link>

          {/* Center: Coupons & Categories */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center ml-32">
            {/* Coupons Dropdown */}
            <div className="relative group">
              <button
                className="text-sm uppercase flex items-center gap-1 text-gray-700 hover:text-[#6b5d4f] transition-colors py-2 whitespace-nowrap"
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
                className="text-sm uppercase flex items-center gap-1 text-gray-700 hover:text-[#6b5d4f] transition-colors py-2 whitespace-nowrap"
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

          {/* Right Section: Search Bar & Login */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            {/* Search Bar */}
            <div className="w-40">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="SEARCH"
                  className="w-full pl-10 pr-4 h-10 text-sm border-gray-300 focus:border-[#6b5d4f] focus:ring-[#6b5d4f]"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Login Button */}
            <Link href="/user/login">
              <Button className="bg-[#6b5d4f] hover:bg-[#5a4d41] text-white text-sm font-medium whitespace-nowrap">
                Login as User
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200">
            {/* Mobile Search */}
            <div className="px-4 pb-3">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="SEARCH ON DEALHUB.COM"
                  className="w-full pl-10 pr-4 h-10 text-sm border-gray-300"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <Link href="/" className="block px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/stores" className="block px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              Stores
            </Link>
            <Link href="/categories" className="block px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              Categories
            </Link>
            <div className="pt-2 border-t border-gray-200 space-y-2">
              <Link href="/user/login" className="block px-4 py-2 text-sm font-medium bg-[#6b5d4f] text-white rounded-lg text-center" onClick={() => setIsMenuOpen(false)}>
                Login as User
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}