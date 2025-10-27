export const stores = [
  { id: 1, name: "Amazon", slug: "amazon", logo: "https://logo.clearbit.com/amazon.com", url: "https://amazon.com", description: "Online retail giant with deals on electronics, home goods, and more" },
  { id: 2, name: "Nike", slug: "nike", logo: "https://logo.clearbit.com/nike.com", url: "https://nike.com", description: "Premium athletic wear and sports equipment with exclusive discounts" },
  { id: 3, name: "Target", slug: "target", logo: "https://logo.clearbit.com/target.com", url: "https://target.com", description: "Everyday essentials with unbeatable prices on home, fashion, and more" },
  { id: 4, name: "Walmart", slug: "walmart", logo: "https://logo.clearbit.com/walmart.com", url: "https://walmart.com", description: "Save money on groceries, electronics, and household items" },
  { id: 5, name: "Best Buy", slug: "best-buy", logo: "https://logo.clearbit.com/bestbuy.com", url: "https://bestbuy.com", description: "Electronics and appliances with competitive deals" },
  { id: 6, name: "Macy's", slug: "macys", logo: "https://logo.clearbit.com/macys.com", url: "https://macys.com", description: "Fashion and home goods from top brands" },
  { id: 7, name: "Sephora", slug: "sephora", logo: "https://logo.clearbit.com/sephora.com", url: "https://sephora.com", description: "Beauty and cosmetics with exclusive rewards" },
  { id: 8, name: "Home Depot", slug: "home-depot", logo: "https://logo.clearbit.com/homedepot.com", url: "https://homedepot.com", description: "Home improvement and garden supplies" },
  { id: 9, name: "Lowe's", slug: "lowes", logo: "https://logo.clearbit.com/lowes.com", url: "https://lowes.com", description: "Tools and materials for home projects" },
  { id: 10, name: "Nordstrom", slug: "nordstrom", logo: "https://logo.clearbit.com/nordstrom.com", url: "https://nordstrom.com", description: "Premium fashion and accessories" },
  { id: 11, name: "Kohl's", slug: "kohls", logo: "https://logo.clearbit.com/kohls.com", url: "https://kohls.com", description: "Department store deals on clothing and home goods" },
  { id: 12, name: "Gap", slug: "gap", logo: "https://logo.clearbit.com/gap.com", url: "https://gap.com", description: "Casual clothing for the whole family" },
  { id: 13, name: "Old Navy", slug: "old-navy", logo: "https://logo.clearbit.com/oldnavy.com", url: "https://oldnavy.com", description: "Affordable fashion for everyone" },
  { id: 14, name: "Bed Bath & Beyond", slug: "bed-bath-beyond", logo: "https://logo.clearbit.com/bedbathandbeyond.com", url: "https://bedbathandbeyond.com", description: "Home essentials and decor" },
  { id: 15, name: "Wayfair", slug: "wayfair", logo: "https://logo.clearbit.com/wayfair.com", url: "https://wayfair.com", description: "Furniture and home decor online" },
  { id: 16, name: "Etsy", slug: "etsy", logo: "https://logo.clearbit.com/etsy.com", url: "https://etsy.com", description: "Handmade and vintage items from artisans" }
];

export const categories = [
  { id: 1, name: "Fashion", slug: "fashion", icon: "👔", description: "Clothing, shoes, and accessories" },
  { id: 2, name: "Electronics", slug: "electronics", icon: "📱", description: "Tech gadgets and devices" },
  { id: 3, name: "Arts & Crafts", slug: "arts-crafts", icon: "🎨", description: "Creative supplies and DIY materials" },
  { id: 4, name: "Home & Garden", slug: "home-garden", icon: "🏡", description: "Home decor and outdoor living" },
  { id: 5, name: "Beauty & Personal Care", slug: "beauty-personal-care", icon: "💅", description: "Cosmetics and skincare products" },
  { id: 6, name: "Sports & Outdoors", slug: "sports-outdoors", icon: "⚽", description: "Athletic gear and outdoor equipment" },
  { id: 7, name: "Food & Dining", slug: "food-dining", icon: "🍔", description: "Groceries and restaurant deals" },
  { id: 8, name: "Travel", slug: "travel", icon: "✈️", description: "Flights, hotels, and vacation packages" },
  { id: 9, name: "Automotive", slug: "automotive", icon: "🚗", description: "Car parts and accessories" },
  { id: 10, name: "Books & Media", slug: "books-media", icon: "📚", description: "Books, movies, and music" }
];

export const coupons = [
  // Amazon
  { id: 1, title: "50% Off Amazon Prime", description: "Get 50% off your first month of Prime membership", code: "PRIME50", discount: "50%", store: "Amazon", storeSlug: "amazon", expiryDate: "2025-12-31", image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800", category: "electronics", active: true },
  { id: 2, title: "30% Off Electronics", description: "Save big on laptops, tablets, and accessories", code: "TECH30", discount: "30%", store: "Amazon", storeSlug: "amazon", expiryDate: "2025-11-30", image: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800", category: "electronics", active: true },
  
  // Nike
  { id: 3, title: "Nike Air Max Discount", description: "Save on Nike Air Max collection", code: "NIKE30", discount: "30%", store: "Nike", storeSlug: "nike", expiryDate: "2025-11-30", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800", category: "fashion", active: true },
  { id: 4, title: "Free Shipping on Orders Over $50", description: "Get free standard shipping on your Nike order", code: "FREESHIP", discount: "Free Shipping", store: "Nike", storeSlug: "nike", expiryDate: "2025-12-31", image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800", category: "sports-outdoors", active: true },
  
  // Target
  { id: 5, title: "15% Off Home Decor", description: "Refresh your space with Target's home collection", code: "HOME15", discount: "15%", store: "Target", storeSlug: "target", expiryDate: "2025-11-25", image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800", category: "home-garden", active: true },
  { id: 6, title: "$10 Off $50 Purchase", description: "Save $10 when you spend $50 or more", code: "SAVE10", discount: "$10 Off", store: "Target", storeSlug: "target", expiryDate: "2025-12-15", image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800", category: "fashion", active: true },
  
  // Best Buy
  { id: 7, title: "20% Off Laptops", description: "Upgrade your tech with this limited-time offer", code: "LAPTOP20", discount: "20%", store: "Best Buy", storeSlug: "best-buy", expiryDate: "2025-11-20", image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800", category: "electronics", active: true },
  { id: 8, title: "Free Installation on Appliances", description: "Get free installation on select appliances", code: "INSTALL", discount: "Free Service", store: "Best Buy", storeSlug: "best-buy", expiryDate: "2025-12-31", image: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800", category: "electronics", active: true },
  
  // Sephora
  { id: 9, title: "25% Off Beauty Products", description: "Stock up on your favorite beauty essentials", code: "BEAUTY25", discount: "25%", store: "Sephora", storeSlug: "sephora", expiryDate: "2025-11-30", image: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=800", category: "beauty-personal-care", active: true },
  { id: 10, title: "Free Gift with Purchase", description: "Get a free makeup bag with orders over $35", code: "FREEGIFT", discount: "Free Gift", store: "Sephora", storeSlug: "sephora", expiryDate: "2025-12-10", image: "https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&w=800", category: "beauty-personal-care", active: true },
  
  // Etsy
  { id: 11, title: "20% Off Arts & Crafts", description: "Create something beautiful with handmade supplies", code: "CRAFT20", discount: "20%", store: "Etsy", storeSlug: "etsy", expiryDate: "2025-12-05", image: "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800", category: "arts-crafts", active: true },
  
  // Home Depot
  { id: 12, title: "$50 Off Orders Over $300", description: "Save on home improvement projects", code: "HOME50", discount: "$50 Off", store: "Home Depot", storeSlug: "home-depot", expiryDate: "2025-11-28", image: "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800", category: "home-garden", active: true },
  
  // Wayfair
  { id: 13, title: "Free Shipping on Furniture", description: "Get free delivery on all furniture orders", code: "SHIPFREE", discount: "Free Shipping", store: "Wayfair", storeSlug: "wayfair", expiryDate: "2025-12-20", image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800", category: "home-garden", active: true },
  
  // Gap
  { id: 14, title: "40% Off Sitewide", description: "Save on all clothing and accessories", code: "GAP40", discount: "40%", store: "Gap", storeSlug: "gap", expiryDate: "2025-11-22", image: "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800", category: "fashion", active: true },
  
  // Nordstrom
  { id: 15, title: "Winter Collection Discount", description: "25% off select winter styles", code: "WINTER25", discount: "25%", store: "Nordstrom", storeSlug: "nordstrom", expiryDate: "2025-12-31", image: "https://images.pexels.com/photos/7679443/pexels-photo-7679443.jpeg?auto=compress&cs=tinysrgb&w=800", category: "fashion", active: true }
];

export const blogPosts = [
  { 
    id: 1, 
    title: "Top 10 Ways to Save Money Online", 
    slug: "top-10-ways-save-money", 
    excerpt: "Discover the best strategies for finding deals and coupons online", 
    image: "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=800", 
    date: "2025-10-15", 
    category: "Tips",
    readTime: "5 min read"
  },
  { 
    id: 2, 
    title: "Black Friday Shopping Guide 2025", 
    slug: "black-friday-guide-2025", 
    excerpt: "Prepare for the biggest shopping event with our comprehensive guide", 
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800", 
    date: "2025-10-20", 
    category: "Guides",
    readTime: "8 min read"
  },
  { 
    id: 3, 
    title: "How to Stack Coupons Like a Pro", 
    slug: "how-to-stack-coupons", 
    excerpt: "Learn the art of combining multiple discounts for maximum savings", 
    image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=800", 
    date: "2025-10-18", 
    category: "Tips",
    readTime: "6 min read"
  },
  { 
    id: 4, 
    title: "Best Coupon Strategies for Black Friday", 
    slug: "best-coupon-strategies-black-friday", 
    excerpt: "Maximize your savings during the biggest sale event of the year", 
    image: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800", 
    date: "2025-10-22", 
    category: "Guides",
    readTime: "7 min read"
  },
  { 
    id: 5, 
    title: "Grocery Shopping on a Budget", 
    slug: "grocery-shopping-budget", 
    excerpt: "Smart tips for cutting your grocery bill without sacrificing quality", 
    image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800", 
    date: "2025-10-12", 
    category: "Tips",
    readTime: "5 min read"
  },
  { 
    id: 6, 
    title: "Holiday Shopping: Start Early and Save", 
    slug: "holiday-shopping-save", 
    excerpt: "Plan ahead and maximize your holiday budget with these strategies", 
    image: "https://images.pexels.com/photos/3303585/pexels-photo-3303585.jpeg?auto=compress&cs=tinysrgb&w=800", 
    date: "2025-10-25", 
    category: "Guides",
    readTime: "6 min read"
  },
  { 
    id: 7, 
    title: "Best Apps for Finding Deals", 
    slug: "best-apps-finding-deals", 
    excerpt: "Download these apps to never miss a great deal again", 
    image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800", 
    date: "2025-10-08", 
    category: "Reviews",
    readTime: "4 min read"
  },
  { 
    id: 8, 
    title: "Cyber Monday vs Black Friday: Which is Better?", 
    slug: "cyber-monday-vs-black-friday", 
    excerpt: "Compare the two biggest shopping days to find the best deals", 
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800", 
    date: "2025-10-28", 
    category: "Guides",
    readTime: "7 min read"
  }
];