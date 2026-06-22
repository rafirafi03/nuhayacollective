"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { ProductCard } from "@/components/products/product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductTabsProps {
  featured: Product[];
  newArrivals: Product[];
  bestSellers: Product[];
}

const tabs = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "New In" },
  { id: "popular", label: "Best Sellers" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ProductTabs({ featured, newArrivals, bestSellers }: ProductTabsProps) {
  const [active, setActive] = useState<TabId>("featured");

  const products =
    active === "featured" ? featured : active === "new" ? newArrivals : bestSellers;

  const viewAllHref =
    active === "featured"
      ? "/products?featured=true"
      : active === "new"
        ? "/products?sort=newest"
        : "/products?sort=popular";

  if (!featured.length && !newArrivals.length && !bestSellers.length) return null;

  return (
    <section className="py-20 sm:py-24 bg-[#f5f0e8]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
        >
          <div>
            <p className="label-caps mb-4">Shop</p>
            <div className="jewel-accent-bar mb-5" />
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight font-normal">
              Find your abaya
            </h2>
          </div>

          <div className="flex gap-8 border-b border-border w-full lg:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={cn(
                  "pb-3 text-[0.62rem] uppercase tracking-[0.2em] font-medium transition-colors border-b -mb-px",
                  active === tab.id
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10"
          >
            {products.slice(0, 8).map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-14">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] font-medium text-primary border border-primary/30 px-8 h-11 hover:bg-primary hover:text-[#f5f5f5] transition-colors rounded-sm"
          >
            View all
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
