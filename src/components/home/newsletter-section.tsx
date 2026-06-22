"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success(`Welcome to ${APP_NAME}!`);
    setEmail("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-20 sm:py-24 bg-[#f5f0e8] border-t border-border/60">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="label-caps mb-4">Newsletter</p>
          <div className="jewel-accent-bar mx-auto mb-6" />
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground font-normal mb-3">
            New arrivals &amp; exclusive offers
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed">
            Be the first to know about new collections from {APP_NAME}.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 flex-1 rounded-sm border-border bg-white text-sm"
              required
              aria-label="Email address"
            />
            <Button
              type="submit"
              disabled={submitted}
              className="h-11 rounded-sm px-6 text-[0.62rem] uppercase tracking-[0.18em] font-medium shrink-0"
            >
              {submitted ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1.5" />
                  Subscribed
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
