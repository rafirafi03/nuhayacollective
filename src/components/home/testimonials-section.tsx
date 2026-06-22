"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SafeImage } from "@/components/shared/safe-image";
import type { Testimonial } from "@/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const featured = testimonials.filter((t) => t.featured);
  const [index, setIndex] = useState(0);
  if (featured.length === 0) return null;

  const current = featured[index % featured.length];
  const prev = () => setIndex((i) => (i - 1 + featured.length) % featured.length);
  const next = () => setIndex((i) => (i + 1) % featured.length);

  return (
    <section className="py-20 sm:py-24 bg-primary text-[#faf6f0]">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-caps mb-6 text-[#faf6f0]/60">Testimonials</p>
          <div className="jewel-accent-bar mx-auto mb-10 bg-[#faf6f0]/35" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
            >
              <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl leading-relaxed font-normal text-balance mb-10">
                &ldquo;{current.content}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                {current.avatarUrl && (
                  <div className="relative size-10 rounded-full overflow-hidden border border-[#faf6f0]/20">
                    <SafeImage src={current.avatarUrl} alt={current.name} fill className="object-cover" sizes="40px" />
                  </div>
                )}
                <div className="text-left">
                  <p className="text-sm font-medium">{current.name}</p>
                  {current.role && <p className="text-xs text-[#faf6f0]/60">{current.role}</p>}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {featured.length > 1 && (
            <div className="flex items-center justify-center gap-6 mt-10">
              <button onClick={prev} className="text-[#faf6f0]/60 hover:text-[#faf6f0] transition-colors" aria-label="Previous">
                <ChevronLeft className="size-4" />
              </button>
              <span className="text-[0.62rem] uppercase tracking-[0.2em] text-[#faf6f0]/50">
                {String(index + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
              </span>
              <button onClick={next} className="text-[#faf6f0]/60 hover:text-[#faf6f0] transition-colors" aria-label="Next">
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
