"use client";

import { SafeImage } from "@/components/shared/safe-image";
import { unsplashUrl, UNSPLASH } from "@/lib/images";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { motion } from "framer-motion";
import type { Banner } from "@/types";

export function PromotionalBanners({ banners }: { banners: Banner[] }) {
  const promos = banners.filter((b) => b.type === "promotional");
  if (promos.length === 0) return null;

  return (
    <section className="py-12 md:py-16 section-sand">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {promos.map((banner, i) => (
            <motion.div
              key={banner._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link
                href={banner.link || "/products"}
                className="group block relative aspect-[4/3] sm:aspect-[21/9] overflow-hidden rounded-2xl ring-1 ring-border/60 bg-brand-oud"
              >
                <SafeImage
                  src={banner.imageUrl || unsplashUrl(UNSPLASH.promo, 1200)}
                  alt={banner.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03] brightness-[0.85]"
                />
                <div className="absolute inset-0 scrim-center group-hover:opacity-100 transition-opacity duration-500" />
                <div className="overlay-content absolute inset-0 flex items-center justify-center text-center p-8 z-10">
                  <div>
                    {banner.subtitle && (
                      <p className="label-caps text-brand-gold mb-2">{banner.subtitle}</p>
                    )}
                    <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-medium tracking-wide leading-tight">
                      {banner.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
