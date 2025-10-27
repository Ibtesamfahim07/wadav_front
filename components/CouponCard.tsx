// components/CouponCard.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface CouponCardProps {
  id: number;
  code: string;
  title: string;
  discount: string;
  description: string;
  store: string;
  storeSlug: string;
  storeUrl?: string;
  image?: string;
  category?: string;
  usageCount?: number;
  active?: boolean;
  type?: "code" | "link";
  expiryDate?: string;
}

export default function CouponCard({
  id,
  code,
  title,
  discount,
  description,
  store,
  storeSlug,
  storeUrl,
  image,
  usageCount = 0,
  active = true,
  type = "code",
  expiryDate,
}: CouponCardProps) {
  const { toast } = useToast();
  const expired = expiryDate && new Date(expiryDate) < new Date();

  const couponColors = [
    "bg-blue-600",
    "bg-cyan-600",
    "bg-purple-600",
    "bg-green-600",
    "bg-teal-600",
    "bg-indigo-600",
  ];
  
  // Convert id to string before using split
  const colorIndex =
    String(id).split("").reduce((a, c) => a + c.charCodeAt(0), 0) % couponColors.length;
  const discountBg = couponColors[colorIndex];

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: `${code} copied to clipboard`,
    });
  };

  const handleClick = () => {
    if (type === "code") {
      copyCode();
    } else if (storeUrl) {
      window.open(storeUrl, "_blank");
    }
  };

  return (
    <Card
      className={`p-6 hover:shadow-md transition-shadow ${
        expired || !active ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-6">
        {/* Discount Badge */}
        <div
          className={`flex-shrink-0 w-24 h-28 ${discountBg} flex flex-col items-center justify-center rounded-lg text-white font-bold`}
        >
          <p className="text-center text-xl leading-tight px-2">
            {discount}
          </p>
          <p className="text-xs mt-1">OFF</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-1 text-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{store}</p>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>

          <Button
            onClick={handleClick}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full px-6"
            disabled={!active || expired}
          >
            {type === "code" ? (
              <>
                <Copy className="h-4 w-4 mr-2" />
                GET COUPON CODE
              </>
            ) : (
              "GET DEAL"
            )}
          </Button>

          {usageCount > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              {usageCount} Used Today
            </p>
          )}
          
          {expiryDate && !expired && (
            <p className="text-xs text-muted-foreground mt-1">
              Expires: {new Date(expiryDate).toLocaleDateString()}
            </p>
          )}
          
          {expired && (
            <p className="text-xs text-red-500 mt-1 font-semibold">
              Expired
            </p>
          )}
        </div>

        {/* Store Image */}
        {image && (
          <div className="flex-shrink-0 w-24 h-20 relative rounded overflow-hidden">
            <Image
              src={image}
              alt={store}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </Card>
  );
}