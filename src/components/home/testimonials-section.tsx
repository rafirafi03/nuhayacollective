"use client";

import { SafeImage } from "@/components/shared/safe-image";
import { Container, SectionHeading } from "@/components/shared/container";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/components/shared/motion";
import type { Testimonial } from "@/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const featured = testimonials.filter((t) => t.featured).slice(0, 3);

  return (
    <section className="py-16 sm:py-22 md:py-26 section-parchment border-y border-border/50">
      <Container>
        <SectionHeading
          title="Voices of the Atelier"
          subtitle="Trusted by connoisseurs who appreciate the art of oud."
          label="Testimonials"
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featured.map((testimonial) => (
            <motion.div key={testimonial._id} variants={fadeIn} className="fragrance-panel hover:border-brand-gold/30 transition-all duration-300">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                  <span key={i} className="text-brand-gold text-sm">★</span>
                ))}
              </div>
              <p className="font-heading text-lg leading-relaxed mb-8">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="flex items-center gap-3 pt-5 border-t border-border/60">
                <div className="relative h-11 w-11 rounded-full overflow-hidden bg-secondary ring-2 ring-brand-gold/20">
                  {testimonial.avatarUrl && (
                    <SafeImage src={testimonial.avatarUrl} alt={testimonial.name} fill className="object-cover" sizes="44px" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  {testimonial.role && <p className="text-xs text-muted-foreground mt-0.5">{testimonial.role}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
