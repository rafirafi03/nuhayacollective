"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/container";
import type { FAQ } from "@/types";

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="py-20 sm:py-24 bg-[#faf6f0]">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 lg:sticky lg:top-24 h-fit"
          >
            <p className="label-caps mb-4">FAQ</p>
            <div className="jewel-accent-bar mb-5" />
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground leading-tight font-normal mb-4">
              Questions answered
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Everything you need to know about our jewellery, sizing, and ordering.
            </p>
          </motion.div>

          <div className="lg:col-span-8">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq._id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <details className="group py-5 sm:py-6 border-b border-border first:border-t">
                  <summary className="font-heading text-lg sm:text-xl text-foreground cursor-pointer list-none flex items-start justify-between gap-4 font-normal">
                    {faq.question}
                    <span className="text-muted-foreground/50 group-open:rotate-45 transition-transform text-2xl leading-none shrink-0">+</span>
                  </summary>
                  <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed pr-8">
                    {faq.answer}
                  </p>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
