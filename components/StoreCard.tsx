// app/components/StoreCard.tsx
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface StoreCardProps {
  name: string;
  logo: string;
  slug: string;
}

export default function StoreCard({ name, logo, slug }: StoreCardProps) {
  return (
    <Link href={`/store/${slug}`}>
      <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer bg-card">
        <div className="flex items-center justify-center h-20">
          <img
            src={logo}
            alt={name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </Card>
    </Link>
  );
}