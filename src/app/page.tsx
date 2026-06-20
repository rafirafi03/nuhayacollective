import { HeroBanner } from "@/components/home/hero-banner";
import { ProductGrid } from "@/components/home/product-grid";
import { CategoriesSection } from "@/components/home/categories-section";
import { PromotionalBanners } from "@/components/home/promotional-banners";
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
      <HeroBanner banners={banners} />
      <CategoriesSection categories={categories} />
      <ProductGrid products={featured} title="Signature Oud" subtitle="Handpicked compositions for the discerning nose" label="Maison Collection" viewAllHref="/products?featured=true" variant="cream" />
      <InstagramReelsSection reels={reels} />
      <PromotionalBanners banners={banners} />
      <ProductGrid products={newArrivals} title="New Arrivals" subtitle="Fresh blends from our atelier" label="Just Landed" viewAllHref="/products?sort=newest" variant="parchment" />
      <ProductGrid products={bestSellers} title="Most Coveted" subtitle="The oud fragrances our clients cherish" label="Bestsellers" viewAllHref="/products?sort=popular" variant="sand" />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <NewsletterSection />
    </>
  );
}
