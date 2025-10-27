// app/contact/page.tsx
import { Metadata } from "next";
import { generateSEO } from "@/components/SEO";
import Link from "next/link";

export const metadata: Metadata = generateSEO({
  title: "Contact DealHub",
  description: "Get in touch with DealHub team. We're here to help with your questions about coupons, advertising, and partnerships.",
  canonical: "/contact",
  keywords: "contact dealhub, customer support, advertising, affiliate program",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-grey-100">
      {/* Header Section */}
      <section className="py-8 px-4 max-w-6xl mx-auto">
        
        {/* White Box Container */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">How can we help?</h1>
          
          <p className="text-lg text-gray-600 text-center mb-12 leading-relaxed">
            Do you have a question or are you interested in working with us?<br />
            Just drop us an email. We try our best to respond every email.
          </p>

          {/* Contact Methods */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">For general queries,</h3>
              <a href="mailto:contact@dealhub.com" className="text-blue-600 hover:underline text-lg">
                contact@dealhub.com
              </a>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">For advertising,</h3>
              <a href="mailto:advertising@dealhub.com" className="text-blue-600 hover:underline text-lg">
                advertising@dealhub.com
              </a>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">For affiliate queries and opportunities,</h3>
              <a href="mailto:affiliate@dealhub.com" className="text-blue-600 hover:underline text-lg">
                affiliate@dealhub.com
              </a>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">For career opportunities,</h3>
              <a href="mailto:career@dealhub.com" className="text-blue-600 hover:underline text-lg">
                career@dealhub.com
              </a>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">For scholarship opportunities,</h3>
              <a href="mailto:scholarship@dealhub.com" className="text-blue-600 hover:underline text-lg">
                scholarship@dealhub.com
              </a>
            </div>
          </div>

          {/* Closing */}
          <div className="text-center mt-16">
            <p className="text-lg text-gray-700 font-medium">
              Look forward to hearing from you,
            </p>
            <p className="text-lg text-gray-700 font-medium mt-2">
              The DealHub Team
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      
    </div>
  );
}