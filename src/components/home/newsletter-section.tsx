"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Sparkles, Gift, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BRAND_NAME } from "@/lib/constants";
import { toast } from "sonner";

const perks = [
  { icon: Sparkles, text: "First access to new oud releases" },
  { icon: Gift, text: "Exclusive member offers" },
  { icon: Mail, text: "Fragrance notes from our perfumers" },
];

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome to AM Fragrance — check your inbox soon.");
    setEmail("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-16 sm:py-20 md:py-28 section-parchment">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-gold/25 shadow-[0_24px_64px_-16px_rgba(28,20,14,0.25)]"
        >
          <div className="absolute inset-0 luxury-gradient" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,_rgba(196,165,116,0.14),_transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_100%,_#ffffff08,_transparent_50%)]" />
          <div
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10"
            aria-hidden
          />
          <div
            className="absolute -left-8 bottom-8 h-40 w-40 rounded-full border border-white/5"
            aria-hidden
          />

          <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-0">
            <div className="p-8 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center overlay-content">
              <p className="label-caps text-brand-gold mb-4 sm:mb-5">The AM Edit</p>
              <div className="oud-accent-bar mb-5" />
              <h2 className="font-heading text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] text-balance max-w-md">
                Be first to discover our{" "}
                <span className="italic text-brand-gold">newest oud</span>
              </h2>
              <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed max-w-md">
                Join {BRAND_NAME} Fragrance&apos;s inner circle for collection previews, scent guides, and
                invitations to private fragrance consultations.
              </p>

              <ul className="mt-8 sm:mt-10 space-y-3.5">
                {perks.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 border border-brand-gold/30">
                      <Icon className="h-3.5 w-3.5 text-brand-gold" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 sm:p-10 md:p-12 lg:p-14 flex items-center bg-white/[0.05] backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                <div className="mb-6 sm:mb-8">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/10 border border-white/20 mb-4">
                    <Mail className="h-5 w-5 text-white/80" />
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl text-white">
                    Subscribe
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 mt-2 leading-relaxed">
                    One thoughtful email per week. Unsubscribe anytime.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 sm:h-[3.25rem] rounded-full bg-white text-black border-0 pl-5 pr-4 text-sm placeholder:text-black/40 shadow-inner"
                      required
                      aria-label="Email address"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitted}
                    className="w-full h-12 sm:h-[3.25rem] rounded-full bg-brand-gold text-brand-espresso hover:bg-brand-gold-light font-medium tracking-wide shadow-md transition-colors duration-300"
                  >
                    {submitted ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        You&apos;re on the list
                      </>
                    ) : (
                      <>
                        Join the list
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="mt-5 text-[10px] sm:text-xs text-white/40 leading-relaxed text-center lg:text-left">
                  By subscribing you agree to receive updates from AM Fragrance.
                  We respect your privacy.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
