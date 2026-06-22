"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SafeImage } from "@/components/shared/safe-image";
import { categoryImage } from "@/lib/images";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";

export function CategoryBento({ categories }: { categories: Category[] }) {
  const featured = categories.filter((c) => c.featured).slice(0, 5);
  if (featured.length === 0) return null;

  return (
    <section className="pt-14 pb-6 sm:pt-18 sm:pb-8 lg:py-24 bg-[#f5f5f5] overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8 sm:mb-10"
        >
          <div>
            <p className="label-caps mb-4">Collections</p>
            <div className="luxe-accent-bar mb-5" />
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight font-normal">
              Shop by style
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] font-medium text-primary hover:opacity-70 transition-opacity"
          >
            View all
            <ArrowUpRight className="size-3.5" />
          </Link>
        </motion.div>

        {/* Mobile + tablet: horizontal scroll */}
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 lg:hidden">
          {featured.map((cat, i) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="snap-start shrink-0 w-[42vw] sm:w-[28vw]"
            >
              <CategoryTile category={cat} index={i} compact />
            </motion.div>
          ))}
        </div>

        {/* Desktop: asymmetric grid — not rendered on mobile to avoid layout gap */}
        <div className="hidden lg:grid grid-cols-12 gap-3 auto-rows-[280px]">
          {featured.map((cat, i) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={cn(
                i === 0 ? "col-span-5 row-span-2" : i === 1 ? "col-span-4" : "col-span-3"
              )}
            >
              <CategoryTile category={cat} index={i} large={i === 0} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CategoryTile({
  category,
  index,
  large = false,
  compact = false,
}: {
  category: Category;
  index: number;
  large?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/products?category=${category.slug.current}`}
      className={cn(
        "group relative block overflow-hidden bg-[#ebebeb]",
        compact ? "aspect-[3/4] w-full" : "h-full min-h-0"
      )}
    >
      <SafeImage
        src={category.imageUrl || categoryImage(index)}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
        sizes={large ? "40vw" : "25vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2c2c32]/85 via-[#2c2c32]/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-[#f5f5f5]">
        <p className="text-[0.58rem] uppercase tracking-[0.24em] text-[#f5f5f5]/60 mb-2 font-medium">
          {category.productCount ? `${category.productCount} styles` : "Collection"}
        </p>
        <h3 className={cn("font-heading font-normal leading-tight", large ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl")}>
          {category.name}
        </h3>
      </div>
    </Link>
  );
}
