// app/blog/[slug]/page.tsx
import { blogPosts } from "@/lib/data";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, User } from "lucide-react";

// Generate static params
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found | DealHub",
      description: "The requested blog post does not exist.",
    };
  }

  return {
    title: `${post.title} | DealHub Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Related/Trending posts (excluding current post)
  const trendingPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 5);
  const latestPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Link href="/" className="hover:text-[#6b5d4f]">HOME</Link>
              <span>›</span>
              <Link href="/blog" className="hover:text-[#6b5d4f]">BLOG</Link>
              <span>›</span>
              <span className="text-gray-900 uppercase">{post.category}</span>
            </div>

            {/* Article Header */}
            <article className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="p-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Jay Kakade</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💬</span>
                    <span>0 Comments</span>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">
                    How Fieldy AI Works?
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>

                  <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">
                    What Are The Key Benefits Of Using Fieldy AI?
                  </h3>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
                  </p>

                  <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                    <li>Enhanced productivity and efficiency</li>
                    <li>Automated workflows and processes</li>
                    <li>Real-time data analysis and insights</li>
                    <li>Seamless integration with existing tools</li>
                    <li>Cost-effective solution for businesses</li>
                  </ul>

                  <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">
                    Best AI Voice Recorder
                  </h3>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                  </p>

                  {/* CTA Box */}
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 my-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-600 text-white px-4 py-2 rounded font-bold text-sm">
                        DEAL
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2 text-gray-900">
                          Fieldy AI- Smarter Notes Taking For Busy Minds
                        </h4>
                        <p className="text-sm text-gray-700 mb-4">
                          Get the award winning voice note application to capture ideas, make important notes, and organize your thoughts effortlessly.
                        </p>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-yellow-500">★★★★★</span>
                          <span className="text-sm text-gray-600">4.8 out of 5 stars (based on 2,347 reviews)</span>
                        </div>
                        <button className="w-full bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-bold py-3 px-6 rounded-md transition-colors">
                          GET COUPON CODE
                        </button>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900">
                    Generate Customizable Summaries
                  </h3>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                  </p>

                  <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">
                    Best AI meeting Assistant
                  </h3>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.
                  </p>

                  {/* Image in content */}
                  <div className="relative w-full h-[300px] my-8 rounded-lg overflow-hidden border-4 border-yellow-400">
                    <Image
                      src={post.image}
                      alt="Content image"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900">
                    For Whom Is Fieldy AI The Best?
                  </h3>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
                  </p>

                  <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                    <li>Students who need to record and transcribe lectures</li>
                    <li>Journalists conducting interviews</li>
                    <li>Business professionals in meetings</li>
                    <li>Researchers gathering field notes</li>
                    <li>Content creators brainstorming ideas</li>
                  </ul>

                  <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900">
                    What Are the Pricing plans of Fieldy AI?
                  </h3>

                  {/* Pricing Table */}
                  <div className="overflow-x-auto my-6">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-3 text-left">Plan</th>
                          <th className="border border-gray-300 p-3 text-left">Monthly</th>
                          <th className="border border-gray-300 p-3 text-left">Annually</th>
                          <th className="border border-gray-300 p-3 text-left">Features</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3 font-medium">Free</td>
                          <td className="border border-gray-300 p-3">$0</td>
                          <td className="border border-gray-300 p-3">$0</td>
                          <td className="border border-gray-300 p-3 text-sm">Basic features, 100 minutes/month</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-medium">Pro</td>
                          <td className="border border-gray-300 p-3">$9.99</td>
                          <td className="border border-gray-300 p-3">$99/year</td>
                          <td className="border border-gray-300 p-3 text-sm">Unlimited transcriptions, AI summaries</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-medium">Business</td>
                          <td className="border border-gray-300 p-3">$29.99</td>
                          <td className="border border-gray-300 p-3">$299/year</td>
                          <td className="border border-gray-300 p-3 text-sm">Team features, priority support, custom integrations</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">
                    Final Thoughts
                  </h2>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    In conclusion, this tool represents a significant advancement in productivity technology. Whether you're a student, professional, or creative, the benefits are clear and the value proposition is strong. We highly recommend giving it a try.
                  </p>
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      AI Tools
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      Productivity
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      Technology
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      Reviews
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar - Right Column (1/3 width) */}
          <aside className="lg:col-span-1">
            {/* Table of Contents */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 sticky top-4">
              <h3 className="font-bold text-lg mb-4 text-gray-900">TABLE OF CONTENT</h3>
              <nav className="space-y-2 text-sm">
                <a href="#" className="block text-[#6b5d4f] hover:underline">
                  1. How Fieldy AI Works?
                </a>
                <a href="#" className="block text-gray-700 hover:text-[#6b5d4f]">
                  2. Key Benefits
                </a>
                <a href="#" className="block text-gray-700 hover:text-[#6b5d4f]">
                  3. Best AI Voice Recorder
                </a>
                <a href="#" className="block text-gray-700 hover:text-[#6b5d4f]">
                  4. Generate Summaries
                </a>
                <a href="#" className="block text-gray-700 hover:text-[#6b5d4f]">
                  5. Best AI meeting Assistant
                </a>
                <a href="#" className="block text-gray-700 hover:text-[#6b5d4f]">
                  6. For Whom Is It Best?
                </a>
                <a href="#" className="block text-gray-700 hover:text-[#6b5d4f]">
                  7. Pricing Plans
                </a>
              </nav>
            </div>

            {/* Trending Now */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h3 className="font-bold text-lg mb-4 text-gray-900">TRENDING NOW</h3>
              <div className="space-y-4">
                {trendingPosts.map((trendingPost, index) => (
                  <Link
                    key={trendingPost.id}
                    href={`/blog/${trendingPost.slug}`}
                    className="flex items-start gap-3 group"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-[#ff6b6b] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <p className="text-sm text-gray-700 group-hover:text-[#6b5d4f] leading-snug">
                      {trendingPost.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Latest Posts with Images */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-lg mb-4 text-gray-900">LATEST POSTS</h3>
              <div className="space-y-4">
                {latestPosts.map((latestPost) => (
                  <Link
                    key={latestPost.id}
                    href={`/blog/${latestPost.slug}`}
                    className="flex gap-3 group"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={latestPost.image}
                        alt={latestPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-[#6b5d4f] line-clamp-2 mb-1">
                        {latestPost.title}
                      </p>
                      <p className="text-xs text-gray-500">{latestPost.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}