// app/categories/page.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Coupons by Category | DealHub",
  description: "Find the best deals and coupons organized by category. Save money on electronics, fashion, food, travel, and more.",
};

// All categories organized by main category
const categoriesData = {
  "Appliances": [
    "Dryers", "Dishwashers", "Freezer", "Footwear",
    "Automatic", "Air Purifier", "Cooler", "Kitchen Sinks",
    "Juicer Mixers", "Dry Cleaners", "AC Forks Unit", "Baking",
  ],
  "Arts & Crafts": [
    "Craft Kits", "Drawing & Painting", "Scrapbooking", "Sewing",
    "Knitting & Crochet", "Beading & Jewelry", "Paper Crafts", "Art Supplies",
  ],
  "Automotive": [
    "Car Parts", "Motorcycles", "Automotive Tools", "Car Electronics",
    "Tires & Wheels", "Car Care", "GPS & Navigation", "Auto Accessories",
  ],
  "Babies & Kids": [
    "Baby Clothing", "Baby Gear", "Diapers", "Baby Food",
    "Toys", "Nursery", "Baby Safety", "Baby Health & Care",
  ],
  "Books & Magazines": [
    "Fiction", "Non-Fiction", "Comics", "Magazines",
    "Textbooks", "E-Books", "Audiobooks", "Children's Books",
  ],
  "Business & Services": [
    "Office Supplies", "Printing Services", "Marketing", "Web Hosting",
    "Business Software", "Consulting", "Legal Services", "Accounting",
  ],
  "Clothing & Accessories": [
    "Men's Clothing", "Women's Clothing", "Kids Clothing", "Shoes",
    "Handbags", "Jewelry", "Watches", "Sunglasses",
  ],
  "Computer & Networking": [
    "Laptops", "Desktops", "Tablets", "Computer Parts",
    "Networking", "Monitors", "Keyboards & Mice", "Printers",
  ],
  "Department Stores": [
    "Target", "Walmart", "Macy's", "Kohl's",
    "JCPenney", "Nordstrom", "Bloomingdale's", "Sears",
  ],
  "Education": [
    "Online Courses", "Tutoring", "Educational Toys", "School Supplies",
    "Books & Textbooks", "Language Learning", "Test Prep", "Educational Software",
  ],
  "Electronics": [
    "TVs", "Audio", "Cameras", "Smart Home",
    "Gaming", "Wearables", "Home Theater", "Cell Phones",
  ],
  "Fashion": [
    "Designer", "Fast Fashion", "Vintage", "Accessories",
    "Footwear", "Activewear", "Formal Wear", "Casual Wear",
  ],
  "Food & Drinks": [
    "Restaurants", "Groceries", "Meal Kits", "Coffee & Tea",
    "Wine & Spirits", "Snacks", "Organic Food", "Specialty Foods",
  ],
  "Games": [
    "Video Games", "Board Games", "Card Games", "Puzzles",
    "Gaming Consoles", "Gaming Accessories", "PC Games", "Mobile Games",
  ],
  "Gifts & Collectibles": [
    "Gift Cards", "Personalized Gifts", "Collectibles", "Flowers",
    "Gift Baskets", "Greeting Cards", "Party Supplies", "Memorabilia",
  ],
  "Health & Beauty": [
    "Skincare", "Makeup", "Hair Care", "Fragrances",
    "Vitamins", "Fitness Equipment", "Personal Care", "Spa & Wellness",
  ],
  "Home & Improvement": [
    "Furniture", "Home Decor", "Kitchen & Dining", "Bedding & Bath",
    "Garden & Outdoor", "Tools", "Lighting", "Storage",
  ],
  "Office & Workplace": [
    "Office Furniture", "Office Electronics", "Stationery", "Filing & Storage",
    "Breakroom Supplies", "Cleaning Supplies", "Safety Equipment", "Mailroom",
  ],
  "Pets": [
    "Pet Food", "Pet Toys", "Pet Health", "Pet Grooming",
    "Pet Beds", "Aquariums", "Bird Supplies", "Small Animals",
  ],
  "Sports & Outdoors": [
    "Exercise & Fitness", "Camping & Hiking", "Water Sports", "Team Sports",
    "Golf", "Cycling", "Hunting & Fishing", "Winter Sports",
  ],
  "Tools & Hardware": [
    "Power Tools", "Hand Tools", "Tool Storage", "Hardware",
    "Electrical", "Plumbing", "Paint Supplies", "Safety Equipment",
  ],
  "Travel": [
    "Hotels", "Flights", "Car Rentals", "Vacation Packages",
    "Cruises", "Travel Insurance", "Luggage", "Travel Accessories",
  ],
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Browse Coupons by Category
          </h1>
          <p className="text-gray-600">
            Find the best deals and discounts organized by category. Click any category to view all available coupons.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-8">
          {Object.entries(categoriesData).map(([mainCategory, subCategories]) => (
            <div key={mainCategory} className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-3">
                {mainCategory}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-3">
                {subCategories.map((subCategory) => (
                  <Link
                    key={subCategory}
                    href={`/category/${subCategory.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                    className="text-sm text-gray-700 hover:text-[#6b5d4f] transition-colors py-1"
                  >
                    {subCategory}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900">About DealHub Categories</h3>
          <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
            <p>
              Welcome to DealHub's comprehensive category directory. We've organized thousands of coupons and deals 
              into easy-to-navigate categories to help you find exactly what you're looking for.
            </p>
            <p>
              Whether you're shopping for electronics, fashion, home goods, or planning your next vacation, our 
              category system makes it simple to discover the best deals and save money on your purchases.
            </p>
            <p>
              Each category contains verified coupons, promo codes, and special offers from top retailers. We update 
              our categories daily to ensure you always have access to the latest and most valuable deals available.
            </p>
            <p className="font-medium">
              💡 Pro Tip: Bookmark your favorite categories to quickly access new deals as they become available!
            </p>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Popular Category Searches</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Electronics Coupons",
              "Fashion Deals",
              "Home Decor Discounts",
              "Beauty Products",
              "Food Delivery",
              "Travel Offers",
              "Fitness Equipment",
              "Pet Supplies",
              "Gaming Deals",
              "Office Supplies",
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}