"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/container";
import { Sparkles, ShieldCheck, Truck, MessageCircle } from "lucide-react";

const items = [
  { icon: Sparkles, label: "Premium Fabrics" },
  { icon: ShieldCheck, label: "Quality Stitching" },
  { icon: Truck, label: "Nationwide Delivery" },
  { icon: MessageCircle, label: "WhatsApp Orders" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-white">
      <Container className="py-4 sm:py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex items-center justify-center sm:justify-start gap-2.5 text-[#a67b5b]"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#a67b5b]/25 bg-[#f5f5f5]">
                <Icon className="size-4" strokeWidth={1.75} />
              </span>
              <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.16em] font-medium text-[#2c2c32]">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
