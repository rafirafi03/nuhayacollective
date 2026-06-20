"use client";

import { useState } from "react";
import { SafeImage } from "@/components/shared/safe-image";
import { heroImage } from "@/lib/images";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Banner } from "@/types";

export function HeroBanner({ banners }: { banners: Banner[] }) {
  const [current, setCurrent] = useState(0);
  const heroBanners = banners.filter((b) => b.type === "hero");

  if (heroBanners.length === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % heroBanners.length);
  const prev = () => setCurrent((c) => (c - 1 + heroBanners.length) % heroBanners.length);

  return (
    <section className="relative h-[55vh] min-h-[360px] sm:h-[62vh] sm:min-h-[420px] md:h-[74vh] md:min-h-[500px] max-h-[860px] overflow-hidden bg-brand-oud">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <SafeImage
            src={heroBanners[current].imageUrl || heroImage(0)}
            alt={heroBanners[current].title}
            fill
            className="object-cover object-center brightness-[0.85]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 scrim-hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-end sm:items-center pb-24 sm:pb-14 md:pb-0">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="overlay-content max-w-2xl pr-0 sm:pr-4"
            >
              {heroBanners[current].subtitle && (
                <p className="label-caps text-white/60 mb-3 sm:mb-4">
                  {heroBanners[current].subtitle}
                </p>
              )}
              <div className="oud-accent-bar mb-4 sm:mb-5" />
              <h1 className="font-heading text-[1.85rem] leading-[1.08] sm:text-3xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-medium text-balance mb-4 sm:mb-5 tracking-tight">
                {heroBanners[current].title}
              </h1>
              {heroBanners[current].description && (
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-7 sm:mb-9 max-w-lg font-light line-clamp-3 sm:line-clamp-none">
                  {heroBanners[current].description}
                </p>
              )}
              {heroBanners[current].link && (
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full bg-white text-foreground hover:bg-white/90 border-0 px-7 sm:px-9 h-11 sm:h-12 tracking-wide font-medium shadow-lg shadow-black/20 transition-all duration-300"
                  asChild
                >
                  <Link href={heroBanners[current].link!}>
                    <span className="truncate">{heroBanners[current].buttonText || "Shop Collection"}</span>
                    <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                  </Link>
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {heroBanners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full border border-white/25 bg-black/30 backdrop-blur-md text-white hover:bg-white hover:text-foreground hover:border-white transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full border border-white/25 bg-black/30 backdrop-blur-md text-white hover:bg-white hover:text-foreground hover:border-white transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === current ? "w-9 sm:w-11 bg-white" : "w-3 sm:w-4 bg-white/35 hover:bg-white/55"
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
