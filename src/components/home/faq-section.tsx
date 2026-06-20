"use client";

import { Container, SectionHeading } from "@/components/shared/container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MotionWrapper } from "@/components/shared/motion";
import type { FAQ } from "@/types";

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="py-16 sm:py-22 md:py-26 section-cream">
      <Container className="max-w-3xl">
        <SectionHeading
          title="Fragrance Guide"
          subtitle="Everything you need to know about our oud perfumes and ordering."
          label="FAQ"
        />
        <MotionWrapper>
          <div className="fragrance-panel">
            <Accordion className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq._id} value={faq._id} className="border-border/60 py-1">
                  <AccordionTrigger className="text-left font-heading text-base sm:text-lg py-5 hover:no-underline hover:text-brand-amber">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </MotionWrapper>
      </Container>
    </section>
  );
}
