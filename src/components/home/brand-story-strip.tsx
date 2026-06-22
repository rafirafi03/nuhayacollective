import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import { heroImage } from "@/lib/images";
import { getWhatsAppHref } from "@/lib/contact";
import type { Banner } from "@/types";

export function BrandStoryStrip({ banners }: { banners: Banner[] }) {
  const promo = banners.find((b) => b.type === "promotional") || banners.find((b) => b.type === "hero");

  return (
    <section className="grid lg:grid-cols-2 bg-primary text-[#faf6f0]">
      <div className="relative min-h-[320px] lg:min-h-full bg-[#2f0a14] order-1">
        <SafeImage
          src={promo?.imageUrl || heroImage(2)}
          alt="Ibadah Jewellery craftsmanship"
          fill
          className="object-cover opacity-90"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-primary/30" />
      </div>
      <div className="flex flex-col justify-center px-8 py-16 sm:px-14 sm:py-20 lg:px-16 order-2">
        <p className="label-caps mb-4 text-[#faf6f0]/60">Our Craft</p>
        <div className="jewel-accent-bar mb-6 bg-[#faf6f0]/35" />
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight mb-5 max-w-md font-normal">
          Jewellery rooted in devotion &amp; artistry
        </h2>
        <p className="text-[#faf6f0]/75 leading-relaxed max-w-md mb-9 text-sm sm:text-base">
          {promo?.description ||
            "Every piece is handcrafted with hallmarked gold and ethically sourced stones. Personal guidance on every order via WhatsApp."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 h-11 px-7 bg-[#faf6f0] text-primary text-[0.62rem] uppercase tracking-[0.18em] font-medium hover:bg-[#f5f0e8] transition-colors rounded-sm"
          >
            Shop Collection
            <ArrowRight className="size-3.5" />
          </Link>
          <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 px-7 border border-[#faf6f0]/35 text-[#faf6f0] text-[0.62rem] uppercase tracking-[0.18em] font-medium hover:bg-[#faf6f0]/10 transition-colors rounded-sm"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
