// app/blog/[slug]/page.tsx
// Complete blog post display with markdown structure rendering

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContentBlock, parseStoredContent } from "@/lib/markdownParser";

interface BlogPost {
  postId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: {
    authorId: number;
    fullName: string;
    bio: string;
    profilePic: string;
    email: string;
  };
  primaryCategory: {
    categoryId: number;
    name: string;
    slug: string;
  };
  categories: Array<{
    categoryId: number;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    tagId: number;
    name: string;
    slug: string;
  }>;
  views: number;
  publishDate: string;
  metaTitle: string;
  metaDescription: string;
}

// Render individual content blocks
const ContentBlockRenderer = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case 'h1':
      return (
        <h1 className="text-4xl md:text-5xl font-bold my-8 text-gray-900">
          {block.content}
        </h1>
      );

    case 'h2':
      return (
        <h2 className="text-3xl font-bold my-6 text-gray-800 mt-10 pt-6 border-t">
          {block.content}
        </h2>
      );

    case 'h3':
      return (
        <h3 className="text-2xl font-semibold my-5 text-gray-700 mt-8">
          {block.content}
        </h3>
      );

    case 'p':
      return (
        <p
          className="text-gray-700 leading-relaxed my-4 text-base md:text-lg"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );

    case 'blockquote':
      return (
        <blockquote
          className="border-l-4 border-blue-500 pl-6 py-4 my-8 italic text-gray-600 bg-blue-50 rounded-r"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );

    case 'ul': {
      try {
        const items = JSON.parse(block.content) as string[];
        return (
          <ul className="list-disc list-inside my-6 text-gray-700 space-y-3 ml-4">
            {items.map((item, i) => (
              <li
                key={i}
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ul>
        );
      } catch {
        return null;
      }
    }

    case 'ol': {
      try {
        const items = JSON.parse(block.content) as string[];
        return (
          <ol className="list-decimal list-inside my-6 text-gray-700 space-y-3 ml-4">
            {items.map((item, i) => (
              <li
                key={i}
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ol>
        );
      } catch {
        return null;
      }
    }

    case 'image': {
      try {
        const { alt, src } = JSON.parse(block.content);
        return (
          <div className="my-8 relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
            />
          </div>
        );
      } catch {
        return null;
      }
    }

    default:
      return null;
  }
};

// Fetch blog post from API
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/blog/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.tags?.map((t) => t.name).join(', '),
    authors: [{ name: post.author.fullName }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      publishedTime: post.publishDate,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

// Main page component
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The blog post you are looking for does not exist.
        </p>
        <Link href="/blog" className="text-blue-600 hover:underline text-lg">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const contentBlocks = parseStoredContent(post.content);
  const publishDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="w-full">
      {/* Hero Section */}
      <div className="w-full bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800 hover:underline mb-6 inline-flex items-center gap-1 text-sm font-medium"
          >
            ← Back to Blog
          </Link>

          {post.featuredImage && (
            <div className="relative h-96 md:h-[500px] w-full rounded-xl overflow-hidden shadow-xl mb-8">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 900px"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-3 items-center mb-6">
            {post.primaryCategory && (
              <Link
                href={`/blog/category/${post.primaryCategory.slug}`}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition"
              >
                {post.primaryCategory.name}
              </Link>
            )}
            <span className="text-sm text-gray-600 font-medium">
              {publishDate}
            </span>
            <span className="text-sm text-gray-600">
              {post.views.toLocaleString()} views
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-4 py-6 border-t border-gray-200">
            {post.author.profilePic && (
              <div className="relative w-16 h-16">
                <Image
                  src={post.author.profilePic}
                  alt={post.author.fullName}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-bold text-gray-900 text-lg">
                {post.author.fullName}
              </p>
              {post.author.bio && (
                <p className="text-sm text-gray-600">{post.author.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {contentBlocks.length > 0 ? (
              contentBlocks.map((block, i) => (
                <ContentBlockRenderer key={i} block={block} />
              ))
            ) : (
              <p className="text-gray-600">No content available.</p>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.tagId}
                    href={`/blog/tag/${tag.slug}`}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts Link */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              More Posts
            </h3>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-lg"
            >
              Read more articles →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}