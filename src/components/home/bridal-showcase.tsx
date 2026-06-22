"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import { Container } from "@/components/shared/container";
import { heroImage, productImage } from "@/lib/images";
import { formatPrice, getProductImageUrl } from "@/utils/format";
import type { Product } from "@/types";

const MAIN_IMAGE = { src: heroImage(1), alt: "Evening abaya styling" };
const SIDE_IMAGES = [
  { src: productImage(6), alt: "Celeste evening abaya" },
  { src: productImage(4), alt: "Noor embroidered abaya" },
] as const;

interface BridalShowcaseProps {
  products?: Product[];
}

export function BridalShowcase({ products = [] }: BridalShowcaseProps) {
  const highlights = products.slice(0, 2);

  return (
    <section className="relative overflow-hidden bg-[#2c2c32]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_40%,rgba(166,123,91,0.2),transparent_70%)]"
      />

      <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
            className="order-1 lg:order-2 overlay-content"
          >
            <span className="inline-flex items-center gap-2 border border-[#f5f5f5]/20 bg-[#f5f5f5]/8 px-3 py-1.5 mb-6">
              <Sparkles className="size-3 text-[#a67b5b]" />
              <span className="text-[0.58rem] uppercase tracking-[0.28em] text-[#f5f5f5] font-medium">
                Evening Collection
              </span>
            </span>

            <h2 className="font-heading text-[2.35rem] sm:text-4xl lg:text-[2.85rem] leading-[1.08] text-balance mb-5 !text-[#f5f5f5]">
              Occasion abayas for every celebration
            </h2>

            <div className="luxe-accent-bar-light mb-6" />

            <p className="text-[#f5f5f5]/80 leading-relaxed text-sm sm:text-base max-w-md mb-8">
              Satin trims, refined embroidery, and flowing silhouettes — designed for Eid, weddings, and evening gatherings.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/products?category=evening-abayas"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-[#a67b5b] text-[#f5f5f5] text-[0.62rem] uppercase tracking-[0.18em] font-semibold hover:bg-[#8a6349] transition-colors rounded-sm"
              >
                Shop Evening
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-8 border border-[#f5f5f5]/35 text-[#f5f5f5] text-[0.62rem] uppercase tracking-[0.18em] font-medium hover:bg-[#f5f5f5]/10 transition-colors rounded-sm"
              >
                Style Consultation
              </Link>
            </div>

            {highlights.length > 0 && (
              <div className="space-y-2.5 border-t border-[#f5f5f5]/15 pt-8">
                <p className="text-[0.58rem] uppercase tracking-[0.26em] text-[#f5f5f5]/60 font-medium mb-4">
                  Featured styles
                </p>
                {highlights.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product.slug.current}`}
                    className="group flex items-center gap-4 border border-[#f5f5f5]/12 bg-[#f5f5f5]/6 p-3 transition-colors hover:border-[#a67b5b]/40 hover:bg-[#f5f5f5]/10"
                  >
                    <div className="relative size-16 shrink-0 overflow-hidden bg-[#3d3d44] ring-1 ring-[#f5f5f5]/10">
                      <SafeImage
                        src={getProductImageUrl(product)}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-heading text-lg leading-snug truncate !text-[#f5f5f5]">
                        {product.name}
                      </p>
                      <p className="text-sm text-[#f5f5f5]/75 mt-0.5">{formatPrice(product.price)}</p>
                    </div>
                    <ArrowRight className="size-4 text-[#f5f5f5]/45 group-hover:text-[#f5f5f5] shrink-0 transition-colors" />
                  </Link>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <div className="flex flex-col gap-3 lg:hidden">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#3d3d44] ring-1 ring-[#f5f5f5]/10">
                <SafeImage src={MAIN_IMAGE.src} alt={MAIN_IMAGE.alt} fill className="object-cover object-[center_15%]" sizes="100vw" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {SIDE_IMAGES.map((item) => (
                  <div key={item.alt} className="relative aspect-[4/5] overflow-hidden bg-[#3d3d44] ring-1 ring-[#f5f5f5]/10">
                    <SafeImage src={item.src} alt={item.alt} fill className="object-cover" sizes="50vw" />
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:grid lg:grid-cols-12 lg:grid-rows-2 lg:gap-3 lg:min-h-[520px]">
              <div className="relative col-span-7 row-span-2 overflow-hidden bg-[#3d3d44] ring-1 ring-[#f5f5f5]/10">
                <SafeImage src={MAIN_IMAGE.src} alt={MAIN_IMAGE.alt} fill className="object-cover object-[center_20%]" sizes="40vw" />
              </div>
              {SIDE_IMAGES.map((item) => (
                <div key={item.alt} className="relative col-span-5 overflow-hidden bg-[#3d3d44] ring-1 ring-[#f5f5f5]/10">
                  <SafeImage src={item.src} alt={item.alt} fill className="object-cover" sizes="25vw" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
