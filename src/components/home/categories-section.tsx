"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container, SectionHeading } from "@/components/shared/container";
import { SafeImage } from "@/components/shared/safe-image";
import { staggerContainer, fadeIn } from "@/components/shared/motion";
import { categoryImage } from "@/lib/images";
import type { Category } from "@/types";

export function CategoriesSection({ categories }: { categories: Category[] }) {
  const featured = categories.filter((c) => c.featured).slice(0, 6);

  return (
    <section className="py-16 sm:py-22 md:py-26 section-cream border-b border-border/40">
      <Container>
        <SectionHeading
          title="Shop by Category"
          subtitle="Explore our curated oud collections"
          label="Collections"
        />
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featured.map((category, i) => (
            <motion.div key={category._id} variants={fadeIn}>
              <Link href={`/products?category=${category.slug.current}`} className="group block">
                <div className="luxury-card p-1.5 sm:p-2 transition-all duration-500 group-hover:border-brand-gold/40 group-hover:shadow-[0_20px_48px_-12px_rgba(42,31,20,0.18)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-brand-oud">
                    <SafeImage
                      src={category.imageUrl || categoryImage(i)}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.9]"
                      sizes="(max-width: 640px) 45vw, 20vw"
                    />
                    <div className="absolute inset-0 scrim-bottom" />
                    <div className="absolute top-3 left-3 oud-accent-bar z-10" />
                    <div className="overlay-content absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-4">
                      <h3 className="font-heading text-sm sm:text-base font-medium tracking-wide leading-tight">
                        {category.name}
                      </h3>
                      {category.productCount && (
                        <p className="text-[10px] uppercase tracking-[0.18em] text-brand-gold mt-1.5 font-medium">
                          {category.productCount} fragrances
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
