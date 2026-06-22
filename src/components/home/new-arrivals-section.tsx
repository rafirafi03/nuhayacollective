"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types";

export function NewArrivalsSection({ products }: { products: Product[] }) {
  const items = products.filter((p) => p.isNewArrival).slice(0, 4);
  if (items.length === 0) return null;

  return (
    <section className="pt-6 pb-14 sm:pt-10 sm:pb-20 lg:py-24 bg-[#f5f5f5]">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="label-caps mb-4 text-[#4a1220]">Just Dropped</p>
            <div className="jewel-accent-bar mb-5" />
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#2a1218] leading-tight">
              New Arrivals
            </h2>
          </motion.div>
          <Link
            href="/products?sort=newest"
            className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] font-medium text-[#4a1220] hover:opacity-70"
          >
            Shop all new
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {items.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
