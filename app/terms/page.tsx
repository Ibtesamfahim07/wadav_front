// app/terms-of-use/page.tsx
import { Metadata } from "next";
import { generateSEO } from "@/components/SEO";
import Link from "next/link";

export const metadata: Metadata = generateSEO({
  title: "Terms of Use",
  description: "Read DealHub's terms of use to understand the rules and regulations for using our website.",
  canonical: "/terms-of-use",
  keywords: "terms of use, terms and conditions, legal",
});

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <section className="py-8 px-4 max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Use</h1>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            DealHub may be used on mentioned below rules. We reserve the right to change/amend/update anytime.
          </p>
        </div>

        {/* Section 1: Introduction */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms of Use are for the DealHub website at www.dealhub.com collectively, the "Site". These terms of use hold an agreement to adjudicate that requires the use of adjudication on an individual basis to resolve disputes rather than a jury or any other legal department.
          </p>
        </section>

        {/* Section 2: Consent to Use */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">2. Consent to Use</h2>
          <p className="text-gray-700 leading-relaxed">
            if you access or use the site you consent to these terms of use, privacy policy and agree that you often visit the terms of use to aware of any updates. If you do not consent to these terms of use, do not use any DealHub services.
          </p>
        </section>

        {/* Section 3: Privacy Confirmation */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">3. Privacy Confirmation</h2>
          <p className="text-gray-700 leading-relaxed">
            DealHub is dedicated to maintaining your privacy. This privacy covers policy mentioned in the privacy policy. There is no technique for the electronic storage to formulate it hundred percent safe. For this, there is no promise that information cannot be access by breach of any of our preserve.
          </p>
        </section>

        {/* Section 4: Linking */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">4. Linking</h2>
          <p className="text-gray-700 leading-relaxed">
            This website might provide links to see the websites that are not controlled or endorsed in any way by DealHub. DealHub believes no accountability for the content and policies of these websites.
          </p>
        </section>

        {/* Section 5: Content */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">5. Content</h2>
          <p className="text-gray-700 leading-relaxed">
            Coupons/offers and all types of discounts against the products are from stores or from the networking sites or may be else sourced so www.dealhub.com is not liable for the fake/false/resricted contents. We mostly use authentic content based on working. All coupons are valid for a limited instant only and expire on the date specified in the offer.
          </p>
        </section>

        {/* Section 6: Disclaimers */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">6. Disclaimers</h2>
          <p className="text-gray-700 leading-relaxed">
            The services and all data on or available through the services are on an "as is" and "as available" basis. We disclaim all warranties of any kind.
          </p>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        
      </section>
    </div>
  );
}