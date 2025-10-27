const StudentDiscountsPage = () => {
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
              <h1 className="text-4xl font-bold mb-4">Student Discounts Guide</h1>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Student Discounts Guide: The Ultimate List of Stores</h2>
              
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Wadav.com student discount guide provide a comprehensive list of stores that offer discounts to students. Currently, the list has 150 plus discount offers (and counting).
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
                    <p className="text-sm font-semibold mt-2">Student Guide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Sections - Same structure as military but with student-focused deals */}
            {[
              {
                title: "Electronics Discounts for Students",
                stores: [
                  { name: "Apple", offer: "Education Discount: Save up to 10% on Mac and iPad", button: "Check Source" },
                  { name: "Microsoft", offer: "Student Offer: Up to 10% off Surface devices", button: "Check Source" },
                  { name: "Adobe", offer: "Get 60% off Creative Cloud for Students", button: "Check Source" }
                ]
              },
              {
                title: "Software & Subscriptions",
                stores: [
                  { name: "Spotify", offer: "Premium Student: 50% off monthly subscription", button: "Check Source" },
                  { name: "Amazon Prime", offer: "Prime Student: 6 months free then 50% off", button: "Check Source" }
                ]
              }
              // Add more categories as needed
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

export default StudentDiscountsPage;