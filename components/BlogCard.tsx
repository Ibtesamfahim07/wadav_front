// app/components/BlogCard.tsx
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, User } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  slug: string;
}

export default function BlogCard({
  title,
  excerpt,
  image,
  author,
  date,
  category,
  slug,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 group cursor-pointer">
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <Badge variant="secondary" className="mb-3">
            {category}
          </Badge>
          <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {date}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}