"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types";

interface FeaturedSpotlightProps {
  products: Product[];
}

export function FeaturedSpotlight({ products }: FeaturedSpotlightProps) {
  if (products.length === 0) return null;

  const [hero, ...rest] = products;

  return (
    <section className="py-20 sm:py-24 bg-white">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 lg:sticky lg:top-24"
          >
            <p className="label-caps mb-4">Signature Pieces</p>
            <div className="jewel-accent-bar mb-5" />
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight font-normal mb-5">
              Crafted to be treasured
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm text-sm sm:text-base">
              Hand-selected fine jewellery — hallmarked gold, certified stones, and artisan finishing on every piece.
            </p>
            <Link
              href="/products?featured=true"
              className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] font-medium text-primary hover:opacity-70 transition-opacity"
            >
              View all signature pieces
              <ArrowRight className="size-3.5" />
            </Link>
          </motion.div>

          <div className="lg:col-span-8 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ProductCard product={hero} layout="spotlight" />
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4">
              {rest.slice(0, 4).map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <ProductCard product={product} layout="compact" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
