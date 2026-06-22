/**
 * Ladies abaya & dress imagery — shared hero + product pool.
 */

/** Pexels — black abaya / black dress (Dubai full-length shoot) */
const ABAYA_PEXELS = [
  13862190,
  13862191,
  13862192,
  13862193,
  13862194,
  13862196,
  13862201,
  13862203,
  13862204,
  13862205,
] as const;

/** Pexels — full-length ladies dress / gown with hijab */
const DRESS_PEXELS = [
  15751048,
  15751050,
  15751052,
  15751054,
  15751056,
  15751058,
] as const;

/** Unsplash — full-length abaya editorials only */
const ABAYA_UNSPLASH = [
  "1750190321721-422ce93c152d", // models black abaya dress
  "1572985263375-a99a8b7bb209", // woman wearing black abaya dress
  "1772474500365-c2c520545f44", // elegant black abaya garment
] as const;

/** Hero slides — same IDs used for product cards */
const HERO_IMAGE_IDS = [
  ABAYA_UNSPLASH[0],
  String(ABAYA_PEXELS[5]),
  String(DRESS_PEXELS[2]),
] as const;

const AVATAR_UNSPLASH = [
  "1494790108377-be9c29b29330",
  "1500648767791-00dcc994a43e",
  "1507003211169-0a1dd7228f2d",
] as const;

const CATEGORY_IDS = [...HERO_IMAGE_IDS, ABAYA_UNSPLASH[1], ABAYA_UNSPLASH[2]] as const;

export function unsplashUrl(id: string, width = 800, fit: "crop" | "max" = "crop"): string {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=85&auto=format&fit=${fit}`;
}

export function pexelsUrl(id: number, width = 800): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&fit=crop`;
}

function resolveImageUrl(id: string, width: number): string {
  if (/^\d+$/.test(id)) return pexelsUrl(Number(id), width);
  return unsplashUrl(id, width);
}

export function productCardImageUrl(url: string, width = 560): string {
  if (url.includes("images.pexels.com")) {
    const match = url.match(/photos\/(\d+)\//);
    if (match) return pexelsUrl(Number(match[1]), width);
  }
  if (!url.includes("images.unsplash.com")) return url;
  const match = url.match(/photo-([a-zA-Z0-9_-]+)/);
  if (!match) return url;
  const height = Math.round(width * 1.35);
  return `https://images.unsplash.com/photo-${match[1]}?w=${width}&h=${height}&q=85&auto=format&fit=crop`;
}

export const PRODUCT_IMAGE_FALLBACK = resolveImageUrl(HERO_IMAGE_IDS[0], 800);

export function productImage(index: number, width = 800): string {
  const id = HERO_IMAGE_IDS[index % HERO_IMAGE_IDS.length];
  return resolveImageUrl(id, width);
}

export function categoryImage(index: number, width = 600): string {
  const id = CATEGORY_IDS[index % CATEGORY_IDS.length];
  return resolveImageUrl(id, width);
}

export function heroImage(index: number, width = 1600): string {
  const id = HERO_IMAGE_IDS[index % HERO_IMAGE_IDS.length];
  return resolveImageUrl(id, width);
}

export function avatarImage(index: number, width = 100): string {
  return unsplashUrl(AVATAR_UNSPLASH[index % AVATAR_UNSPLASH.length], width);
}

export function promoImage(width = 1200): string {
  return resolveImageUrl(HERO_IMAGE_IDS[0], width);
}
