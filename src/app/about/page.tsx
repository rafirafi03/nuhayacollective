import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gem, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { StoryReelPlayer } from "@/components/about/story-reel-player";
import { Button } from "@/components/ui/button";
import { getSettings, getStoryReel } from "@/services/content-service";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";
import { getWhatsAppHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Our Story",
  description: `Discover the story behind ${BRAND_NAME} ${BRAND_TAGLINE} — handcrafted fine jewellery with hallmarked gold and certified stones.`,
};

const pillars = [
  {
    icon: Gem,
    title: "Hallmarked Gold",
    text: "Every gold piece is BIS hallmarked. We work with trusted artisans who honour traditional techniques while meeting modern quality standards.",
  },
  {
    icon: Sparkles,
    title: "Certified Stones",
    text: "Diamonds and gemstones are ethically sourced with certification where applicable — transparency you can trust.",
  },
  {
    icon: ShieldCheck,
    title: "Craftsmanship",
    text: "From hand engraving to precision stone setting, each piece passes through skilled hands before it reaches yours.",
  },
  {
    icon: MessageCircle,
    title: "Concierge on WhatsApp",
    text: "Not sure about sizing or styling? Message us anytime. Our jewellers guide you from selection to delivery.",
  },
];

export default async function AboutPage() {
  const [settings, storyReel] = await Promise.all([getSettings(), getStoryReel()]);
  const whatsappHref = getWhatsAppHref();

  return (
    <>
      {storyReel && (
        <section className="section-cream border-b border-border">
          <Container className="py-10 sm:py-12">
            <PageHeader
              label="Our Story"
              title="Crafting Fine Jewellery with Devotion"
              subtitle={`${settings.storeName} began with a belief that jewellery should be personal, lasting, and made with intention — pieces you pass down, not discard.`}
              className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 pb-0 border-0 [&_.jewel-accent-bar]:mx-auto [&_.oud-accent-bar]:mx-auto"
            />
            <div className="text-center max-w-lg mx-auto mb-6 sm:mb-8">
              <p className="label-caps mb-3">Behind the Craft</p>
              <div className="jewel-accent-bar mx-auto mb-4" />
              <h2 className="font-heading text-xl sm:text-2xl">See our atelier in action</h2>
            </div>
            <StoryReelPlayer reel={storyReel} className="max-w-[300px] mx-auto" />
          </Container>
        </section>
      )}

      <section className="section-parchment border-b border-border">
        <Container className="py-14 sm:py-16">
          <div className="max-w-3xl space-y-8">
            <div>
              <p className="label-caps mb-3">The Maison</p>
              <div className="jewel-accent-bar mb-5" />
              <p className="font-heading text-xl sm:text-2xl leading-relaxed text-foreground/90">
                {settings.storeDescription}
              </p>
            </div>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                What started as a passion for fine goldsmithing grew into a full collection of rings, necklaces,
                earrings, and bridal jewellery — each piece designed to celebrate life&apos;s most meaningful moments.
              </p>
              <p>
                Based in Kerala, India, we serve customers across the country with insured delivery and personal styling
                support on WhatsApp. Whether you&apos;re choosing an engagement ring or a everyday staple, we&apos;re here to help.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-cream border-b border-border">
        <Container className="py-14 sm:py-16">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <p className="label-caps mb-3">Our Promise</p>
            <div className="jewel-accent-bar mx-auto mb-5" />
            <h2 className="font-heading text-2xl sm:text-3xl">What sets us apart</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div key={title} className="jewel-panel hover:border-primary/20 transition-colors">
                <Icon className="size-6 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="font-heading text-xl mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-wine">
        <Container className="py-14 sm:py-16 text-center">
          <p className="label-caps mb-3 text-[#faf6f0]/60">Visit Us</p>
          <div className="jewel-accent-bar mx-auto mb-5 bg-[#faf6f0]/35" />
          <h2 className="font-heading text-2xl sm:text-3xl mb-4">Ready to find your piece?</h2>
          <p className="text-[#faf6f0]/75 max-w-md mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Browse our collection online or chat with our team for personalised recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="rounded-sm bg-[#faf6f0] text-primary hover:bg-[#f5f0e8] h-11 px-8" asChild>
              <Link href="/products">
                Shop Jewellery
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-sm border-[#faf6f0]/40 text-[#faf6f0] hover:bg-[#faf6f0]/10 h-11 px-8 bg-transparent" asChild>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
