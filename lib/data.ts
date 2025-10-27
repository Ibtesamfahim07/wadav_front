// Mock Data
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
  { id: 1, title: "50% Off Amazon Prime", description: "Get 50% off your first month of Prime membership", code: "PRIME50", discount: "50%", store: "Amazon", storeSlug: "amazon", expiryDate: "2025-12-31", image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800", category: "electronics", active: true, clickCount: 0, usageCount: 0 },
  { id: 2, title: "30% Off Electronics", description: "Save big on laptops, tablets, and accessories", code: "TECH30", discount: "30%", store: "Amazon", storeSlug: "amazon", expiryDate: "2025-11-30", image: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800", category: "electronics", active: true, clickCount: 0, usageCount: 0 },
  
  // Nike
  { id: 3, title: "Nike Air Max Discount", description: "Save on Nike Air Max collection", code: "NIKE30", discount: "30%", store: "Nike", storeSlug: "nike", expiryDate: "2025-11-30", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800", category: "fashion", active: true, clickCount: 0, usageCount: 0 },
  { id: 4, title: "Free Shipping on Orders Over $50", description: "Get free standard shipping on your Nike order", code: "FREESHIP", discount: "Free Shipping", store: "Nike", storeSlug: "nike", expiryDate: "2025-12-31", image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800", category: "sports-outdoors", active: true, clickCount: 0, usageCount: 0 },
  
  // Target
  { id: 5, title: "15% Off Home Decor", description: "Refresh your space with Target's home collection", code: "HOME15", discount: "15%", store: "Target", storeSlug: "target", expiryDate: "2025-11-25", image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800", category: "home-garden", active: true, clickCount: 0, usageCount: 0 },
  { id: 6, title: "$10 Off $50 Purchase", description: "Save $10 when you spend $50 or more", code: "SAVE10", discount: "$10 Off", store: "Target", storeSlug: "target", expiryDate: "2025-12-15", image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800", category: "fashion", active: true, clickCount: 0, usageCount: 0 },
  
  // Best Buy
  { id: 7, title: "20% Off Laptops", description: "Upgrade your tech with this limited-time offer", code: "LAPTOP20", discount: "20%", store: "Best Buy", storeSlug: "best-buy", expiryDate: "2025-11-20", image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800", category: "electronics", active: true, clickCount: 0, usageCount: 0 },
  { id: 8, title: "Free Installation on Appliances", description: "Get free installation on select appliances", code: "INSTALL", discount: "Free Service", store: "Best Buy", storeSlug: "best-buy", expiryDate: "2025-12-31", image: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800", category: "electronics", active: true, clickCount: 0, usageCount: 0 },
  
  // Sephora
  { id: 9, title: "25% Off Beauty Products", description: "Stock up on your favorite beauty essentials", code: "BEAUTY25", discount: "25%", store: "Sephora", storeSlug: "sephora", expiryDate: "2025-11-30", image: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=800", category: "beauty-personal-care", active: true, clickCount: 0, usageCount: 0 },
  { id: 10, title: "Free Gift with Purchase", description: "Get a free makeup bag with orders over $35", code: "FREEGIFT", discount: "Free Gift", store: "Sephora", storeSlug: "sephora", expiryDate: "2025-12-10", image: "https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&w=800", category: "beauty-personal-care", active: true, clickCount: 0, usageCount: 0 },
  
  // Etsy
  { id: 11, title: "20% Off Arts & Crafts", description: "Create something beautiful with handmade supplies", code: "CRAFT20", discount: "20%", store: "Etsy", storeSlug: "etsy", expiryDate: "2025-12-05", image: "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800", category: "arts-crafts", active: true, clickCount: 0, usageCount: 0 },
  
  // Home Depot
  { id: 12, title: "$50 Off Orders Over $300", description: "Save on home improvement projects", code: "HOME50", discount: "$50 Off", store: "Home Depot", storeSlug: "home-depot", expiryDate: "2025-11-28", image: "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800", category: "home-garden", active: true, clickCount: 0, usageCount: 0 },
  
  // Wayfair
  { id: 13, title: "Free Shipping on Furniture", description: "Get free delivery on all furniture orders", code: "SHIPFREE", discount: "Free Shipping", store: "Wayfair", storeSlug: "wayfair", expiryDate: "2025-12-20", image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800", category: "home-garden", active: true, clickCount: 0, usageCount: 0 },
  
  // Gap
  { id: 14, title: "40% Off Sitewide", description: "Save on all clothing and accessories", code: "GAP40", discount: "40%", store: "Gap", storeSlug: "gap", expiryDate: "2025-11-22", image: "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800", category: "fashion", active: true, clickCount: 0, usageCount: 0 },
  
  // Nordstrom
  { id: 15, title: "Winter Collection Discount", description: "25% off select winter styles", code: "WINTER25", discount: "25%", store: "Nordstrom", storeSlug: "nordstrom", expiryDate: "2025-12-31", image: "https://images.pexels.com/photos/7679443/pexels-photo-7679443.jpeg?auto=compress&cs=tinysrgb&w=800", category: "fashion", active: true, clickCount: 0, usageCount: 0 }
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
    readTime: "5 min read",
    content: "Full blog post content here...",
    author: "Admin"
  },
  { 
    id: 2, 
    title: "Black Friday Shopping Guide 2025", 
    slug: "black-friday-guide-2025", 
    excerpt: "Prepare for the biggest shopping event with our comprehensive guide", 
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800", 
    date: "2025-10-20", 
    category: "Guides",
    readTime: "8 min read",
    content: "Full blog post content here...",
    author: "Admin"
  },
  { 
    id: 3, 
    title: "How to Stack Coupons Like a Pro", 
    slug: "how-to-stack-coupons", 
    excerpt: "Learn the art of combining multiple discounts for maximum savings", 
    image: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=800", 
    date: "2025-10-18", 
    category: "Tips",
    readTime: "6 min read",
    content: "Full blog post content here...",
    author: "Admin"
  },
  { 
    id: 4, 
    title: "Best Coupon Strategies for Black Friday", 
    slug: "best-coupon-strategies-black-friday", 
    excerpt: "Maximize your savings during the biggest sale event of the year", 
    image: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800", 
    date: "2025-10-22", 
    category: "Guides",
    readTime: "7 min read",
    content: "Full blog post content here...",
    author: "Admin"
  },
  { 
    id: 5, 
    title: "Grocery Shopping on a Budget", 
    slug: "grocery-shopping-budget", 
    excerpt: "Smart tips for cutting your grocery bill without sacrificing quality", 
    image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800", 
    date: "2025-10-12", 
    category: "Tips",
    readTime: "5 min read",
    content: "Full blog post content here...",
    author: "Admin"
  },
  { 
    id: 6, 
    title: "Holiday Shopping: Start Early and Save", 
    slug: "holiday-shopping-save", 
    excerpt: "Plan ahead and maximize your holiday budget with these strategies", 
    image: "https://images.pexels.com/photos/749353/pexels-photo-749353.jpeg", 
    date: "2025-10-25", 
    category: "Guides",
    readTime: "6 min read",
    content: "Full blog post content here...",
    author: "Admin"
  },
  { 
    id: 7, 
    title: "Best Apps for Finding Deals", 
    slug: "best-apps-finding-deals", 
    excerpt: "Download these apps to never miss a great deal again", 
    image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800", 
    date: "2025-10-08", 
    category: "Reviews",
    readTime: "4 min read",
    content: "Full blog post content here...",
    author: "Admin"
  },
  { 
    id: 8, 
    title: "Cyber Monday vs Black Friday: Which is Better?", 
    slug: "cyber-monday-vs-black-friday", 
    excerpt: "Compare the two biggest shopping days to find the best deals", 
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800", 
    date: "2025-10-28", 
    category: "Guides",
    readTime: "7 min read",
    content: "Full blog post content here...",
    author: "Admin"
  }
];

// Military Discounts Data
export const militaryDiscounts = [
  {
    id: 1,
    title: "Arts & Crafts Discounts for Military",
    stores: [
      { 
        name: "Minted", 
        offer: "RetailMeNot Deal! 20% Off Your Order", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/minted.com",
        image: "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ]
  },
  {
    id: 2,
    title: "Babies & Kids Discounts for Military", 
    stores: [
      { 
        name: "Kiwico", 
        offer: "eBay Savings: Get Up to 37% Off on Kiwico Baby Gear & Accessories...", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/kiwico.com",
        image: "https://images.pexels.com/photos/789786/pexels-photo-789786.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ]
  },
  {
    id: 3,
    title: "Clothing & Accessories Discounts for Military",
    stores: [
      { 
        name: "All Citizens", 
        offer: "Get 20% Discount with Student Offer", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/allcitizens.com",
        image: "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Nylon Belt", 
        offer: "Take Military Grade Nylon Belt For $23", 
        button: "Check Source",
        logo: "/images/nylon-belt-logo.jpg",
        image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Aaa Watch Club", 
        offer: "Buy 3 or more & Take 15% On Military Series", 
        button: "Check Source",
        logo: "/images/aaa-watch-logo.jpg",
        image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Crocs US", 
        offer: "Get 25% Off Student Discount at Crocs with Student Beans - croc...", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/crocs.com",
        image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Gap", 
        offer: "Extra 50% Off Sale Styles!", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/gap.com",
        image: "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Gap", 
        offer: "10% Off Or 20% Off 5100+ Reg. Price Styles", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/gap.com",
        image: "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Gap", 
        offer: "Extra 60% Off Sale Styles!", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/gap.com",
        image: "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "H&m", 
        offer: "Up to 50% Off Select Sale Styles", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/hm.com",
        image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Nike", 
        offer: "Black Friday deal - 10% Off Your Birthday for Nike Members:", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/nike.com",
        image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ]
  },
  {
    id: 4,
    title: "Department Stores Discounts for Military",
    stores: [
      { 
        name: "Sears", 
        offer: "eBay Savings: Get Up to 32% Off on Sears Office Suppl", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/sears.com",
        image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "JCPenney", 
        offer: "Easter Mystery Sale! Extra 30% Off Select Items", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/jcpenney.com",
        image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Walgreens", 
        offer: "Extra 20% Off $60 Or More", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/walgreens.com",
        image: "https://images.pexels.com/photos/3657151/pexels-photo-3657151.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "J.crew", 
        offer: "Extra 20% Off Purchase Including Sale styles", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/jcrew.com",
        image: "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Walgreens", 
        offer: "Extra 20% Off $60 Or More", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/walgreens.com",
        image: "https://images.pexels.com/photos/3657151/pexels-photo-3657151.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "J.crew", 
        offer: "40% Off Select Full Price Styles + Extra 50% Off Sale Styles", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/jcrew.com",
        image: "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ]
  },
  {
    id: 5,
    title: "Electronics Discounts for Military",
    stores: [
      { 
        name: "Target", 
        offer: "Up to 50% Off With Target's Best Coupons, Offers & Promo Codes", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/target.com",
        image: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Walgreens", 
        offer: "Extra 15% Off S30+ Sitewide", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/walgreens.com",
        image: "https://images.pexels.com/photos/3657151/pexels-photo-3657151.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Walmart", 
        offer: "Up to 50% Off Electronics Clearance, TVs & Laptops", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/walmart.com",
        image: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Ebay", 
        offer: "Take 15% Off Select Tech, Home, Auto, And More", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/ebay.com",
        image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Target", 
        offer: "Up to 50% Off With Target In-Store Coupons", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/target.com",
        image: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Samsung", 
        offer: "samsung voucher promotion : Grab up to 40% off On Smartphones,", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/samsung.com",
        image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Best Buy", 
        offer: "Save 50% on Electronics + Free Shipping on $35+ w/ Code", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/bestbuy.com",
        image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Lenovo", 
        offer: "LENOVO STUDENT DISCOUNT | Up to 25% on all products", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/lenovo.com",
        image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Best Buy", 
        offer: "50% Off Or More on Electronics + Free Shipping on $35+", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/bestbuy.com",
        image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800"
      }
    ]
  },
  {
    id: 6,
    title: "Food & Drinks Discounts for Military",
    stores: [
      { 
        name: "Nespresso", 
        offer: "Try saving with our other great deals today!", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/nespresso.com",
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Olive Garden", 
        offer: "Free Gift With Order of an Adult Entree", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/olivegarden.com",
        image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Subway", 
        offer: "Subway Deal: Get Up to 19% Off Restaurants at Walmart (Free...", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/subway.com",
        image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ]
  },
  {
    id: 7,
    title: "Health & Beauty Discounts for Military",
    stores: [
      { 
        name: "Sephora", 
        offer: "This Up to 50% Off Sale offer", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/sephora.com",
        image: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Sephora", 
        offer: "Free Gift With $25 Order", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/sephora.com",
        image: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ]
  },
  {
    id: 8,
    title: "Home & Improvement Discounts for Military",
    stores: [
      { 
        name: "Home Depot", 
        offer: "Home Depot Coupons, In-Store Offers & Promos:", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/homedepot.com",
        image: "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Ikea", 
        offer: "$100 Off Queen Mattress", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/ikea.com",
        image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ]
  },
  {
    id: 9,
    title: "Pets Discounts for Military",
    stores: []
  },
  {
    id: 10,
    title: "Sports & Outdoors Discounts for Military",
    stores: [
      { 
        name: "Padelnuestro", 
        offer: "Get Students can receive a 5% discount in the padel shop Padel", 
        button: "Check Source",
        logo: "/images/padelnuestro-logo.jpg",
        image: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Under Armour", 
        offer: "Extra 25% Off Select Golf Styles at Under Armour", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/underarmour.com",
        image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ]
  },
  {
    id: 11,
    title: "Travel & Vacation Discounts for Military",
    stores: [
      { 
        name: "Expedia", 
        offer: "Book Early & Save 20% Or More", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/expedia.com",
        image: "https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Booking.com", 
        offer: "Spring Travel Deals! Up to 15% Off + Deals Starting at $55", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/booking.com",
        image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Priceline", 
        offer: "Black Friday 2024 Exclusive! Extra 7% Off Express Deals Hotels", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/priceline.com",
        image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Booking.com", 
        offer: "Spring Travel Deals! Up to 15% Off + Deals Starting at $55", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/booking.com",
        image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Priceline", 
        offer: "Priceline Deal: Get Up to 16% Off Hotels at Walmart (Free...", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/priceline.com",
        image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Aaa Watch Club", 
        offer: "Buy 2 and get 10% Off - Military Series", 
        button: "Check Source",
        logo: "/images/aaa-watch-logo.jpg",
        image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Steiner-juwelier", 
        offer: "Avail 15% Off On SWISS MILITARY Quartz Chronograph", 
        button: "Check Source",
        logo: "/images/steiner-logo.jpg",
        image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Corelife", 
        offer: "Get Adjustable Heavy Duty Nylon Military Belt For $11.99", 
        button: "Check Source",
        logo: "/images/corelife-logo.jpg",
        image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ]
  }
];

// Student Discounts Data
export const studentDiscounts = [
  {
    id: 1,
    title: "Electronics Discounts for Students",
    stores: [
      { 
        name: "Apple", 
        offer: "Education Discount: Save up to 10% on Mac and iPad", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/apple.com",
        image: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Microsoft", 
        offer: "Student Offer: Up to 10% off Surface devices", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/microsoft.com",
        image: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Adobe", 
        offer: "Get 60% off Creative Cloud for Students", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/adobe.com",
        image: "https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ]
  },
  {
    id: 2,
    title: "Software & Subscriptions",
    stores: [
      { 
        name: "Spotify", 
        offer: "Premium Student: 50% off monthly subscription", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/spotify.com",
        image: "https://images.pexels.com/photos/6342/computer-music-program-application.jpg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Amazon Prime", 
        offer: "Prime Student: 6 months free then 50% off", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/amazon.com",
        image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ]
  },
  {
    id: 3,
    title: "Fashion & Apparel for Students",
    stores: [
      { 
        name: "ASOS", 
        offer: "10% off for students with UNiDAYS", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/asos.com",
        image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      { 
        name: "Urban Outfitters", 
        offer: "Extra 10% off for students", 
        button: "Check Source",
        logo: "https://logo.clearbit.com/urbanoutfitters.com",
        image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ]
  }
];

// Export mock data for AdminContext
export const mockCoupons = coupons;
export const mockStores = stores;
export const mockBlogPosts = blogPosts;