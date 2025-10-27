const CareersPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-8 text-gray-900">WE NEED YOU TO HELP US ROCK</h1>
          <div className="space-y-6 text-lg text-gray-700 max-w-3xl mx-auto">
            <a href="/about" className="text-blue-600 hover:underline block text-xl font-semibold">
              Learn About Us
            </a>
            <p className="leading-relaxed">
              If you have right set of skills, passion and have a craze for innovation than look nowhere. 
              You are at the right place. We are looking for you
            </p>
            <p className="font-bold text-xl">Join the WADAV team</p>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">CURRENT OPENINGS</h2>
          
          {/* Front-End Developer */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-6 text-gray-900">FRONT-END DEVELOPER</h3>
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Position Responsibilities:</h4>
              <p className="text-gray-700 text-lg leading-relaxed">
                He/She will be responsible for implementing front-end and client-side technologies for cross-mobile-platform products.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Position Qualifications:</h4>
              <p className="text-gray-700 text-lg leading-relaxed">
                BS or MS in Computer Science, Engineering or equivalent is required
              </p>
            </div>
          </div>

          {/* Affiliate Marketing Manager */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-6 text-gray-900">AFFILIATE MARKETING MANAGER</h3>
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Position Responsibilities:</h4>
              <p className="text-gray-700 text-lg leading-relaxed">
                He/She will be responsible for Project management and cross team communication. He/She will be required to work with finance, SEO, Social Media, engineering, sales, and product department.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Position Qualifications:</h4>
              <p className="text-gray-700 text-lg leading-relaxed">
                BBA/MBA or equivalent is required
              </p>
            </div>
          </div>

          {/* UI Designer */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-6 text-gray-900">UI DESIGNER</h3>
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Position Responsibilities:</h4>
              <p className="text-gray-700 text-lg leading-relaxed">
                He/She will be required to produce high-quality user interfaces and visual designs. He/She will be responsible for complete graphic designing from concept to execution for web and mobile devices.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Position Qualifications:</h4>
              <p className="text-gray-700 text-lg leading-relaxed">
                BS or MS in Computer Science, Engineering or equivalent is required
              </p>
            </div>
          </div>

          {/* Application Instructions */}
          <div className="text-center py-8">
            <p className="text-lg text-gray-700 mb-2">
              Please email your applications, at <span className="font-semibold">careers@wadav.com</span>
            </p>
            <p className="text-lg text-gray-700">
              with subject <span className="font-semibold">"Careers at Wadav"</span>
            </p>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default CareersPage;