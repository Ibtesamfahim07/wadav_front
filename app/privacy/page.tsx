// app/privacy-policy/page.tsx
import { Metadata } from "next";
import { generateSEO } from "@/components/SEO";

export const metadata: Metadata = generateSEO({
  title: "Privacy Policy",
  description: "Learn about DealHub's privacy policy and how we handle user information and data.",
  canonical: "/privacy-policy",
  keywords: "privacy policy, data protection, user information",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Title */}
        <h1 className="text-4xl font-bold mb-8 text-center">PRIVACY POLICY</h1>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            This Privacy Policy ("Privacy Policy") makes Client how dealhub.com, ("dealhub.com," "we," "us" and "our") uses user information either user is through any computer, mobile or electronic device and applies to all who make use of our website i.e. www.dealhub.com – or any of our online actions, links, pages, information we own or context, (collectively, the "Store"). When using www.dealhub.com, you agree to our Terms of Use of Information in Privacy Policy, take and sharing of your information and data, and other activities, as mentioned below.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            By using the Site, you are in agreement with the terms of this Privacy Policy, if you do not consent with the practices described in this Privacy Policy, please do not interact with the Site.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We may modify this Privacy Policy at any time.
          </p>
        </div>

        {/* Policy Organization */}
        <div className="mb-8">
          <p className="text-gray-700 font-medium">
            This Privacy Declaration is organised as follows:
          </p>
          <ol className="list-decimal list-inside mt-2 text-gray-700 space-y-1">
            <li>User Information</li>
            <li>Users' UserData</li>
            <li>How we can users' information</li>
            <li>Personal Information</li>
            <li>Juvenile subscriptions</li>
          </ol>
        </div>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Section 1: User Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. User Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Following it, the information which is collected, where you interact with us and the Site, for example, where:
          </p>
          <ol className="list-lower-alpha list-inside text-gray-700 space-y-2 ml-4">
            <li>You register, subscribe, or create an account with dealhub.com</li>
            <li>You purchase products or services on or through the site</li>
            <li>You cannot or use the site</li>
            <li>You spend or correspondingly to emails</li>
            <li>Your identification friends, family, or others to dealhub.com</li>
            <li>You contact us or use other customer support tools</li>
            <li>You wish by page online that display our ads or content</li>
            <li>You are informed via social networking etc.</li>
            <li>You post/commercial/refinancial/us content/waffine groups</li>
            <li>You are connected to our vendors</li>
            <li>You are referred to analytics</li>
          </ol>
          <p className="text-gray-700 leading-relaxed mt-4">
            This Privacy Policy for user information is limited to the above-mentioned points.
          </p>
        </section>

        {/* Section 2: Users' Like/Dislike */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Users' Like/Dislike</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have an opportunity for your choice to inform about your queries related to the market of dealhub.com when we know more about you and what you like, we can serve you better. However, you can limit the communications on your choice that dealhub.com sends to you.
          </p>

          <div className="ml-4">
            <h3 className="text-lg font-semibold mb-2">(a) Commercial Emails</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may choose not to receive commercial e-mails from us. You can be emailed related to your account or your transactions on the site either you unsubscribe commercial emails. You may update your subscription preferences at any time.
            </p>

            <h3 className="text-lg font-semibold mb-2">(b) Cookies and Third Party Technologies</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              User information served in cookies is general phenomenon. We work on cookie mechanism for user information and identify whether for the better service in an online market. Many of the information regarding user depends on the browser used by the user so the user can set own settings regarding cookies manually. Proper user information can help us to study you for your desire and give you services as we can possible.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Third party technologies are essential and need to every online business. We use analytics to track the user. Analytics gives basic information of users like country, city, road lines, sports banks, leaners, rate, operating systems, browse, office sites used later or before. time spent on site, little of stores pages and etc. These all information helps us to make better services for the user by knowing the users' nature.
            </p>
          </div>
        </section>

        {/* Section 3: How we use users' Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. How we use users' Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For internal business requirements, we can use the user information. We relate the user intent for the services user need and update the users for their requirements, follow them and update them for promotional messages, upcoming products, and services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For the transaction purpose, we may use the user information with affiliates sites, if needed.
          </p>
        </section>

        {/* Section 4: Personal Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Personal Information</h2>
          <p className="text-gray-700 leading-relaxed">
            Personal information may be required when to contact the user directly for any specific reason or for user complaints/questions. We keep secret personal information of the user. If you had compliance, it may court/legal/government or law enforcement organisations/companygroup or team who is legally authorised for the access of users' personal information. Is in contact with us for users' information we may share users' information in that special case specifically.
          </p>
        </section>

        {/* Section 5: Juvenile subscriptions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Juvenile subscriptions</h2>
          <p className="text-gray-700 leading-relaxed">
            Underage subscriptions are not allowed at dealhub.com, we believe that who uses this site is not in the category of juvenile and if any under-age person is making any transaction/services or use of the site, dealhub.com is not responsible for any type of related action.
          </p>
        </section>
      </div>
    </div>
  );
}