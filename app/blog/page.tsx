import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/lib/data";
import { generateSEO } from "@/components/SEO";


export const metadata: Metadata = generateSEO({
  title: "Blog - Money-Saving Tips",
  description: "Read our latest articles on saving money, finding deals, and smart shopping",
  canonical: "/blog",
});

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map(post => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="overflow-hidden hover:shadow-lg transition cursor-pointer h-full">
              <div className="relative h-56 w-full"><Image src={post.image} alt={post.title} fill className="object-cover" /></div>
              <CardContent className="p-6">
                <p className="text-xs text-primary mb-2">{post.category} • {post.date}</p>
                <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
