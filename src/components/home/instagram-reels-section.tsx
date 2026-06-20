"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Container, SectionHeading } from "@/components/shared/container";
import { InstagramReelCard } from "@/components/shared/instagram-reel-card";
import { Button } from "@/components/ui/button";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/constants";
import type { InstagramReel } from "@/types";
import { cn } from "@/lib/utils";

interface InstagramReelsSectionProps {
  reels: InstagramReel[];
  title?: string;
  subtitle?: string;
  label?: string;
  className?: string;
}

export function InstagramReelsSection({
  reels,
  title = "From Our Atelier",
  subtitle = "Watch reels here on our site, or open them on Instagram.",
  label = "Instagram Reels",
  className,
}: InstagramReelsSectionProps) {
  const featured = reels.filter((r) => r.featured !== false).slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className={cn("relative py-16 sm:py-20 md:py-28 overflow-hidden", className)}>
      <div className="absolute inset-0 luxury-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,_rgba(110,103,95,0.12),_transparent_60%)]" />
      <div className="absolute top-0 inset-x-0 h-px gold-line opacity-40" />

      <Container className="relative z-10">
        <SectionHeading
          label={label}
          title={title}
          subtitle={subtitle}
          className="mb-10 sm:mb-12 [&_h2]:!text-white [&_.text-muted-foreground]:!text-white/75 [&_.label-caps]:!text-brand-gold"
        />

        <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
          {featured.map((reel, i) => (
            <motion.div
              key={reel._id}
              className="snap-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <InstagramReelCard reel={reel} index={i} variant="carousel" />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-10 sm:mt-12">
          <Button
            variant="outline"
            className="rounded-full border-white/25 bg-transparent text-white hover:bg-white hover:text-brand-espresso transition-all duration-300 tracking-wide"
            asChild
          >
            <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
              </svg>
              Follow @{INSTAGRAM_HANDLE}
              <ExternalLink className="h-3.5 w-3.5 ml-2 opacity-60" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

interface ProductReelsProps {
  reels: InstagramReel[];
  productName: string;
}

export function ProductInstagramReels({ reels, productName }: ProductReelsProps) {
  if (!reels.length) return null;

  return (
    <div className="mt-12 pt-12 border-t border-border/60">
      <p className="label-caps text-brand-gold mb-2">Instagram</p>
      <h3 className="font-heading text-xl sm:text-2xl text-primary mb-6">
        See {productName} in action
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl">
        {reels.map((reel, i) => (
          <InstagramReelCard key={reel._id} reel={reel} index={i} variant="grid" />
        ))}
      </div>
    </div>
  );
}
