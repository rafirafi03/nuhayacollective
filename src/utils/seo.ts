import type { Product } from "@/types";
import { APP_NAME, APP_URL, BRAND_LOGO_PATH, BRAND_SHARE_IMAGE_PATH } from "@/lib/constants";

export const brandLogoMetadata = {
  url: BRAND_LOGO_PATH,
  width: 803,
  height: 803,
  alt: `${APP_NAME} logo`,
  type: "image/jpeg",
} as const;

export const brandShareImageMetadata = {
  url: BRAND_SHARE_IMAGE_PATH,
  width: 1080,
  height: 769,
  alt: `${APP_NAME} — premium abayas`,
  type: "image/jpeg",
} as const;

export function generateProductJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.shortDescription,
    image: product.imageUrl,
    sku: product._id,
    brand: product.brand ? { "@type": "Brand", name: product.brand.name } : undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${APP_URL}/products/${product.slug.current}`,
    },
    aggregateRating: product.averageRating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.averageRating,
          reviewCount: product.reviewCount || 0,
        }
      : undefined,
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_NAME,
    url: APP_URL,
    logo: `${APP_URL}${BRAND_LOGO_PATH}`,
    image: `${APP_URL}${BRAND_SHARE_IMAGE_PATH}`,
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
