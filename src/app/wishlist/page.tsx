"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlist-store";
import { mockProducts } from "@/lib/mock-data";
import type { Product } from "@/types";

export default function WishlistPage() {
  const wishlistIds = useWishlistStore((s) => s.items);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(mockProducts.filter((p) => wishlistIds.includes(p._id)));
  }, [wishlistIds]);

  if (products.length === 0) {
    return (
      <div className="section-parchment min-h-[60vh]">
        <Container className="py-20 text-center">
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
          <h1 className="font-heading text-2xl mb-2">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-6">Save fragrances you love for later</p>
          <Button variant="luxury" className="rounded-full" asChild><Link href="/products">Browse Fragrances</Link></Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="section-parchment min-h-[60vh]">
      <Container className="py-8 sm:py-10">
        <PageHeader title={`Saved Fragrances (${products.length})`} label="Wishlist" subtitle="Your curated collection of favourites." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
