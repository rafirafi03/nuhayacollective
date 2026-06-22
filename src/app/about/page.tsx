import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles, Scissors } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { StoryReelPlayer } from "@/components/about/story-reel-player";
import { Button } from "@/components/ui/button";
import { getSettings, getStoryReel } from "@/services/content-service";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";
import { getWhatsAppHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Our Story",
  description: `Discover the story behind ${BRAND_NAME} ${BRAND_TAGLINE} — premium modest wear and abayas crafted with care.`,
};

const pillars = [
  {
    icon: Sparkles,
    title: "Premium Fabrics",
    text: "We source nida, crepe, linen-blend, and chiffon fabrics chosen for drape, breathability, and lasting quality.",
  },
  {
    icon: Scissors,
    title: "Refined Tailoring",
    text: "Every abaya is cut for a flattering modest silhouette — clean lines, secure closures, and thoughtful finishing.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    text: "Each piece is inspected before dispatch. Stitching, hems, and embellishment are held to a premium standard.",
  },
  {
    icon: MessageCircle,
    title: "Concierge on WhatsApp",
    text: "Not sure about sizing or style? Message us anytime. Our stylists guide you from selection to delivery.",
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
              title="Modest Luxury, Thoughtfully Made"
              subtitle={`${settings.storeName} was founded on a simple belief — modest wear should feel as beautiful as it looks.`}
              className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 pb-0 border-0 [&_.luxe-accent-bar]:mx-auto [&_.oud-accent-bar]:mx-auto"
            />
            <div className="text-center max-w-lg mx-auto mb-6 sm:mb-8">
              <p className="label-caps mb-3">Behind the Atelier</p>
              <div className="luxe-accent-bar mx-auto mb-4" />
              <h2 className="font-heading text-xl sm:text-2xl">See our collection in motion</h2>
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
              <div className="luxe-accent-bar mb-5" />
              <p className="font-heading text-xl sm:text-2xl leading-relaxed text-foreground/90">
                {settings.storeDescription}
              </p>
            </div>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                From open abayas and kimono silhouettes to embroidered evening pieces, each design is created
                for women who value elegance, comfort, and modesty in equal measure.
              </p>
              <p>
                Based in Srinagar, India, we serve customers across the country with reliable delivery and personal
                styling support on WhatsApp. Whether you&apos;re dressing for everyday or a special occasion, we&apos;re here to help.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-cream border-b border-border">
        <Container className="py-14 sm:py-16">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <p className="label-caps mb-3">Our Promise</p>
            <div className="luxe-accent-bar mx-auto mb-5" />
            <h2 className="font-heading text-2xl sm:text-3xl">What sets us apart</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {pillars.map(({ icon: Icon, title, text }) => (
              <div key={title} className="luxe-panel hover:border-primary/20 transition-colors">
                <Icon className="size-6 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="font-heading text-xl mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-dark">
        <Container className="py-14 sm:py-16 text-center">
          <p className="label-caps mb-3 text-[#f5f5f5]/60">Visit Us</p>
          <div className="luxe-accent-bar-light mx-auto mb-5" />
          <h2 className="font-heading text-2xl sm:text-3xl mb-4 !text-[#f5f5f5]">Ready to find your abaya?</h2>
          <p className="text-[#f5f5f5]/75 max-w-md mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Browse our collection online or chat with our team for personalised recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="rounded-sm bg-[#a67b5b] text-[#f5f5f5] hover:bg-[#8a6349] h-11 px-8" asChild>
              <Link href="/products">
                Shop Abayas
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-sm border-[#f5f5f5]/40 text-[#f5f5f5] hover:bg-[#f5f5f5]/10 h-11 px-8 bg-transparent" asChild>
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
