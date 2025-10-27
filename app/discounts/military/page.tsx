const MilitaryDiscountsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      

      {/* Page Navigation Sidebar */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4">PAGE NAVIGATION</h3>
              <nav className="space-y-2">
                {[
                  "Arts & Crafts",
                  "Babies & Kids", 
                  "Clothing & Accessories",
                  "Department Stores",
                  "Electronics",
                  "Food & Drinks",
                  "Health & Beauty",
                  "Home & Improvement",
                  "Pets",
                  "Sports & Outdoors",
                  "Travel & Vacation"
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <span className="text-gray-500 w-6">{index + 1}.</span>
                    <span className="hover:text-blue-600 cursor-pointer">{item}</span>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 max-w-md">
                <span className="text-gray-500 mr-2">Q</span>
                <input 
                  type="text" 
                  placeholder="search on wadav.com" 
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>

            {/* Hero Section */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-4">Military Discounts Guide</h1>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Military Discounts Guide: The Ultimate List of Stores</h2>
              
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Wadav.com military discount guide provide a comprehensive list of stores that offer discounts to military. Currently, the list has 150 plus discount offers (and counting).
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Here you'll find all the offers for clothing, furniture, fitness, entertainment, food, travel, electronics and more. Please bookmark the page for future reference as we update the page after every three to four months.
                  </p>
                </div>
                
                {/* PDF Download Card */}
                <div className="w-full lg:w-64 bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-lg mb-3">Download a free PDF version of this Guide</h3>
                  <p className="text-sm text-gray-700 mb-4">Read it whenever and wherever you want</p>
                  <div className="bg-white p-4 rounded border text-center">
                    <span className="text-2xl">📄</span>
                    <p className="text-sm font-semibold mt-2">Canton Fair</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Sections */}
            {[
              {
                title: "Arts & Crafts Discounts for Military",
                stores: [
                  { name: "Minted", offer: "RetailMeNot Deal! 20% Off Your Order", button: "Check Source" }
                ]
              },
              {
                title: "Babies & Kids Discounts for Military", 
                stores: [
                  { name: "Kiwico", offer: "eBay Savings: Get Up to 37% Off on Kiwico Baby Gear & Accessories...", button: "Check Source" }
                ]
              },
              {
                title: "Clothing & Accessories Discounts for Military",
                stores: [
                  { name: "All Citizens", offer: "Get 20% Discount with Student Offer", button: "Check Source" },
                  { name: "Nylon Belt", offer: "Take Military Grade Nylon Belt For $23", button: "Check Source" },
                  { name: "Aaa Watch Club", offer: "Buy 3 or more & Take 15% On Military Series", button: "Check Source" },
                  { name: "Crocs US", offer: "Get 25% Off Student Discount at Crocs with Student Beans - croc...", button: "Check Source" },
                  { name: "Gap", offer: "Extra 50% Off Sale Styles!", button: "Check Source" },
                  { name: "Gap", offer: "10% Off Or 20% Off 5100+ Reg. Price Styles", button: "Check Source" },
                  { name: "Gap", offer: "Extra 60% Off Sale Styles!", button: "Check Source" },
                  { name: "H&m", offer: "Up to 50% Off Select Sale Styles", button: "Check Source" },
                  { name: "Nike", offer: "Black Friday deal - 10% Off Your Birthday for Nike Members:", button: "Check Source" }
                ]
              },
              {
                title: "Department Stores Discounts for Military",
                stores: [
                  { name: "Sears", offer: "eBay Savings: Get Up to 32% Off on Sears Office Suppl", button: "Check Source" },
                  { name: "JCPenney", offer: "Easter Mystery Sale! Extra 30% Off Select Items", button: "Check Source" },
                  { name: "Walgreens", offer: "Extra 20% Off $60 Or More", button: "Check Source" },
                  { name: "J.crew", offer: "Extra 20% Off Purchase Including Sale styles", button: "Check Source" },
                  { name: "Walgreens", offer: "Extra 20% Off $60 Or More", button: "Check Source" },
                  { name: "J.crew", offer: "40% Off Select Full Price Styles + Extra 50% Off Sale Styles", button: "Check Source" }
                ]
              },
              {
                title: "Electronics Discounts for Military",
                stores: [
                  { name: "Target", offer: "Up to 50% Off With Target's Best Coupons, Offers & Promo Codes", button: "Check Source" },
                  { name: "Walgreens", offer: "Extra 15% Off S30+ Sitewide", button: "Check Source" },
                  { name: "Walmart", offer: "Up to 50% Off Electronics Clearance, TVs & Laptops", button: "Check Source" },
                  { name: "Ebay", offer: "Take 15% Off Select Tech, Home, Auto, And More", button: "Check Source" },
                  { name: "Target", offer: "Up to 50% Off With Target In-Store Coupons", button: "Check Source" },
                  { name: "Samsung", offer: "samsung voucher promotion : Grab up to 40% off On Smartphones,", button: "Check Source" },
                  { name: "Best Buy", offer: "Save 50% on Electronics + Free Shipping on $35+ w/ Code", button: "Check Source" },
                  { name: "Lenovo", offer: "LENOVO STUDENT DISCOUNT | Up to 25% on all products", button: "Check Source" },
                  { name: "Best Buy", offer: "50% Off Or More on Electronics + Free Shipping on $35+", button: "Check Source" }
                ]
              },
              {
                title: "Food & Drinks Discounts for Military",
                stores: [
                  { name: "Nespresso", offer: "Try saving with our other great deals today!", button: "Check Source" },
                  { name: "Olive Garden", offer: "Free Gift With Order of an Adult Entree", button: "Check Source" },
                  { name: "Subway", offer: "Subway Deal: Get Up to 19% Off Restaurants at Walmart (Free...", button: "Check Source" }
                ]
              },
              {
                title: "Health & Beauty Discounts for Military",
                stores: [
                  { name: "Sephora", offer: "This Up to 50% Off Sale offer", button: "Check Source" },
                  { name: "Sephora", offer: "Free Gift With $25 Order", button: "Check Source" }
                ]
              },
              {
                title: "Home & Improvement Discounts for Military",
                stores: [
                  { name: "Home Depot", offer: "Home Depot Coupons, In-Store Offers & Promos:", button: "Check Source" },
                  { name: "Ikea", offer: "$100 Off Queen Mattress", button: "Check Source" }
                ]
              },
              {
                title: "Pets Discounts for Military",
                stores: []
              },
              {
                title: "Sports & Outdoors Discounts for Military",
                stores: [
                  { name: "Padelnuestro", offer: "Get Students can receive a 5% discount in the padel shop Padel", button: "Check Source" },
                  { name: "Under Armour", offer: "Extra 25% Off Select Golf Styles at Under Armour", button: "Check Source" }
                ]
              },
              {
                title: "Travel & Vacation Discounts for Military",
                stores: [
                  { name: "Expedia", offer: "Book Early & Save 20% Or More", button: "Check Source" },
                  { name: "Booking.com", offer: "Spring Travel Deals! Up to 15% Off + Deals Starting at $55", button: "Check Source" },
                  { name: "Priceline", offer: "Black Friday 2024 Exclusive! Extra 7% Off Express Deals Hotels", button: "Check Source" },
                  { name: "Booking.com", offer: "Spring Travel Deals! Up to 15% Off + Deals Starting at $55", button: "Check Source" },
                  { name: "Priceline", offer: "Priceline Deal: Get Up to 16% Off Hotels at Walmart (Free...", button: "Check Source" },
                  { name: "Aaa Watch Club", offer: "Buy 2 and get 10% Off - Military Series", button: "Check Source" },
                  { name: "Steiner-juwelier", offer: "Avail 15% Off On SWISS MILITARY Quartz Chronograph", button: "Check Source" },
                  { name: "Corelife", offer: "Get Adjustable Heavy Duty Nylon Military Belt For $11.99", button: "Check Source" }
                ]
              }
            ].map((category, index) => (
              <div key={index} className="mb-12">
                <h3 className="text-2xl font-bold mb-6 border-b pb-2">{category.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.stores.map((store, storeIndex) => (
                    <div key={storeIndex} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="font-semibold text-lg mb-2">{store.name}</div>
                      <p className="text-gray-600 text-sm mb-3">{store.offer}</p>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                        {store.button}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilitaryDiscountsPage;