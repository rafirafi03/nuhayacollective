import { HeroBanner } from "@/components/home/hero-banner";
import { TrustBar } from "@/components/home/trust-bar";
import { CategoryBento } from "@/components/home/category-bento";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { BridalShowcase } from "@/components/home/bridal-showcase";
import { ProductTabs } from "@/components/home/product-tabs";
import { InstagramReelsSection } from "@/components/home/instagram-reels-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FAQSection } from "@/components/home/faq-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import {
  getBanners, getCategories, getFeaturedProducts,
  getNewArrivals, getBestSellers, getFAQs, getTestimonials,
  getInstagramReels,
} from "@/services/content-service";

export const revalidate = 3600;

export default async function HomePage() {
  const [banners, categories, featured, newArrivals, bestSellers, faqs, testimonials, reels] = await Promise.all([
    getBanners(),
    getCategories(),
    getFeaturedProducts(),
    getNewArrivals(),
    getBestSellers(),
    getFAQs(),
    getTestimonials(),
    getInstagramReels(),
  ]);

  return (
    <>
      <HeroBanner banners={banners} featuredProducts={featured} />
      <TrustBar />
      <CategoryBento categories={categories} />
      <NewArrivalsSection products={newArrivals.length ? newArrivals : featured} />
      <BridalShowcase
        products={featured.filter((p) => p.category?.slug.current === "bridal-collection")}
      />
      <ProductTabs featured={featured} newArrivals={newArrivals} bestSellers={bestSellers} />
      <InstagramReelsSection reels={reels} />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <NewsletterSection />
    </>
  );
}
