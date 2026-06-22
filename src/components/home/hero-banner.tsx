"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { heroImage } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { Banner, Product } from "@/types";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

interface HeroBannerProps {
  banners: Banner[];
  featuredProducts?: Product[];
}

export function HeroBanner({ banners }: HeroBannerProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const heroBanners = banners.filter((b) => b.type === "hero");

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % heroBanners.length),
    [heroBanners.length]
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + heroBanners.length) % heroBanners.length),
    [heroBanners.length]
  );

  useEffect(() => {
    if (heroBanners.length <= 1 || paused) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [heroBanners.length, paused, next, current]);

  if (heroBanners.length === 0) return null;

  const banner = heroBanners[current];

  return (
    <section
      className="relative -mt-[3.75rem] sm:-mt-16 min-h-[100svh] overflow-hidden bg-[#2f0a14]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
          >
            <SafeImage
              src={banner.imageUrl || heroImage(current)}
              alt={banner.title}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 scrim-hero-open" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex min-h-[100svh] flex-col pt-[calc(3.75rem+1rem)] sm:pt-[calc(4rem+1.25rem)]">
        <Container className="flex flex-1 flex-col justify-end pb-24 sm:pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={stagger}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-xl overlay-content"
            >
              {banner.subtitle && (
                <motion.p
                  variants={fadeUp}
                  className="hero-text-shadow text-[0.62rem] uppercase tracking-[0.32em] text-[#faf6f0] font-semibold mb-4"
                >
                  {banner.subtitle}
                </motion.p>
              )}

              <motion.h1
                variants={fadeUp}
                className="hero-text-shadow font-heading text-[2.5rem] leading-[1.06] sm:text-5xl lg:text-[3.5rem] text-[#faf6f0] text-balance"
              >
                {banner.title}
              </motion.h1>

              <motion.div variants={fadeUp} className="jewel-accent-bar-light mt-6 mb-8" />

              {banner.link && (
                <motion.div variants={fadeUp}>
                  <Button
                    size="lg"
                    className="h-12 rounded-sm bg-[#faf6f0] text-[#4a1220] hover:bg-[#f5f0e8] px-8 text-[0.65rem] uppercase tracking-[0.18em] font-semibold shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35)]"
                    asChild
                  >
                    <Link href={banner.link}>
                      {banner.buttonText || "Shop Now"}
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </Container>

        <div className="absolute bottom-0 inset-x-0 z-20 pointer-events-none">
          <div className="h-28 bg-gradient-to-t from-[#2f0a14]/80 to-transparent" />
          <Container className="relative -mt-20 pb-6 sm:pb-7 pointer-events-auto">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 hero-text-shadow">
                <span className="font-heading text-2xl sm:text-3xl text-[#faf6f0] tabular-nums leading-none">
                  {String(current + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.25em] text-[#faf6f0] font-medium">
                  / {String(heroBanners.length).padStart(2, "0")}
                </span>
                <div className="hidden sm:flex gap-1.5 ml-2">
                  {heroBanners.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={cn(
                        "h-0.5 rounded-full transition-all duration-300",
                        i === current ? "w-7 bg-[#faf6f0]" : "w-2.5 bg-[#faf6f0]/40 hover:bg-[#faf6f0]/70"
                      )}
                    />
                  ))}
                </div>
              </div>

              {heroBanners.length > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={prev}
                    className="p-2 text-[#faf6f0] hover:text-[#faf6f0]/80 transition-colors"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    onClick={next}
                    className="p-2 text-[#faf6f0] hover:text-[#faf6f0]/80 transition-colors"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </Container>
        </div>
      </div>

      <div className="relative z-20 bg-[#faf6f0] border-t border-[#dccfc4] py-3 overflow-hidden">
        <div className="flex whitespace-nowrap marquee-track w-max">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center">
              {[
                "Hallmarked Gold",
                "Certified Stones",
                "Insured Delivery",
                "WhatsApp Orders",
                "Bridal Specialists",
              ].map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="flex items-center px-8 text-[0.62rem] uppercase tracking-[0.22em] text-[#4a1220] font-medium"
                >
                  <span className="size-1 rounded-full bg-[#4a1220]/50 mr-8" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
