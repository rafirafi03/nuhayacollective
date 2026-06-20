/** Verified Unsplash photo IDs — oud / niche / attar aesthetic (dark, unisex) */
export const UNSPLASH = {
  /** Product shots — bottles, attars, dark luxury */
  perfume1: "1757313251539-4a49688994d2", // Roja Aoud bottle
  perfume2: "1769625310883-6c87ed402d6f", // Black niche cologne bottle
  perfume3: "1647009822729-0076c73fe6f0", // Perfume bottle with rock — moody
  perfume4: "1738414808975-201966230c59", // Small attar-style bottle on table
  perfume5: "1669444699729-f55f7cf9f82b", // Attar / oud oil bottles group
  perfume6: "1588514912908-8f5891714f8d", // Dark labeled fragrance bottle
  perfume7: "1594118252385-f190dc2ebcc1", // Black & gold perfume bottle
  perfume8: "1556228720-195a672e8a03", // Neutral dark product still life
  perfume9: "1544947950-fa07a98d237f", // Warm amber-toned product still life
  /** Hero / banner — oud atmosphere */
  hero1: "1684039568465-24c31d0cc80f", // Incense burner with smoke on rug
  hero2: "1777361988778-6e918aaa2e26", // Burning incense — modern dark
  hero3: "1617615181070-ab4788da6d03", // Oud wood logs close-up
  promo: "1590375096341-0c6b35a09d79", // Dark wood / resin texture
  avatar1: "1494790108377-be9c29b29330",
  avatar2: "1500648767791-00dcc994a43e",
  avatar3: "1507003211169-0a1dd7228f2d",
} as const;

export function unsplashUrl(id: string, width = 800, fit: "crop" | "max" = "crop"): string {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=85&auto=format&fit=${fit}`;
}

/** Full product visible — no crop, for card thumbnails */
export function productCardImageUrl(url: string, width = 560): string {
  if (!url.includes("images.unsplash.com")) return url;
  const match = url.match(/photo-([a-zA-Z0-9_-]+)/);
  if (!match) return url;
  const height = Math.round(width * 1.35);
  return `https://images.unsplash.com/photo-${match[1]}?w=${width}&h=${height}&q=85&auto=format&fit=max`;
}

export const PRODUCT_IMAGES = [
  UNSPLASH.perfume1,
  UNSPLASH.perfume2,
  UNSPLASH.perfume3,
  UNSPLASH.perfume4,
  UNSPLASH.perfume5,
  UNSPLASH.perfume6,
  UNSPLASH.perfume7,
  UNSPLASH.perfume8,
  UNSPLASH.perfume9,
] as const;

export const CATEGORY_IMAGES = [
  UNSPLASH.perfume1,
  UNSPLASH.perfume2,
  UNSPLASH.perfume5,
  UNSPLASH.perfume4,
  UNSPLASH.perfume3,
  UNSPLASH.perfume6,
] as const;

export const HERO_IMAGES = [
  UNSPLASH.hero1,
  UNSPLASH.hero2,
  UNSPLASH.hero3,
] as const;

/** Default fallback when an image fails to load */
export const PRODUCT_IMAGE_FALLBACK = unsplashUrl(UNSPLASH.perfume2, 800);

export function productImage(index: number, width = 800): string {
  return unsplashUrl(PRODUCT_IMAGES[index % PRODUCT_IMAGES.length], width);
}

export function categoryImage(index: number, width = 600): string {
  return unsplashUrl(CATEGORY_IMAGES[index % CATEGORY_IMAGES.length], width);
}

export function heroImage(index: number, width = 1600): string {
  return unsplashUrl(HERO_IMAGES[index % HERO_IMAGES.length], width);
}

export function avatarImage(index: number, width = 100): string {
  const ids = [UNSPLASH.avatar1, UNSPLASH.avatar2, UNSPLASH.avatar3];
  return unsplashUrl(ids[index % ids.length], width);
}
