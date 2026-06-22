/**
 * Verified jewellery-only stock images (Unsplash + hand-checked Pexels).
 * Every ID below was confirmed as rings, necklaces, earrings, bracelets, or bridal sets —
 * no shoes, beach, fashion, or lifestyle-only shots.
 */

/** Unsplash — all verified jewellery product/display shots */
const JEWELRY_UNSPLASH = [
  "1605100804763-247f67b3557e", // solitaire diamond ring
  "1721103418939-5112f0ccfac8", // diamond necklace + earrings
  "1739194840254-1611fee0070c", // necklace, bracelet, ring, earrings on display
  "1739194840257-0035eaafc61e", // necklace, bracelet, ring, earring set
  "1727947074642-0bd47ef70b58", // pair of necklaces + earrings
  "1722410180687-b05b50922362", // necklace + earring on mannequin
  "1769116416641-e714b71851e8", // jewellery box with necklaces, rings, earrings
  "1573408301185-9146fe634ad0", // ring on hand
  "1724594963412-d98c3cd9eab6", // ring on white pillow
  "1481980235850-66e47651e431", // gold & silver rings on fingers
  "1506630448388-4e683c67ddb0", // gold jewellery detail
] as const;

/** Unsplash — hero banners (model wearing jewellery or macro ring) */
const HERO_UNSPLASH = [
  "1694062045776-f48d9b6de57e", // woman wearing gold necklace & earrings
  "1633934542430-0905ccb5f050", // close-up rings + necklace
  "1605100804763-247f67b3557e", // macro diamond ring
] as const;

/** Pexels — verified jewellery (backup / variety) */
const JEWELRY_PEXELS = [
  691046, // diamond engagement ring macro
  265906, // ornate rings on rose
  1191531, // gold bangles on wrist
  1927259, // ring in gift box
  11655269, // gold leaf earrings on white
] as const;

const AVATAR_UNSPLASH = [
  "1494790108377-be9c29b29330",
  "1500648767791-00dcc994a43e",
  "1507003211169-0a1dd7228f2d",
] as const;

const PRODUCT_IDS = [...JEWELRY_UNSPLASH, ...JEWELRY_PEXELS.map(String)] as const;

const CATEGORY_UNSPLASH = [
  "1605100804763-247f67b3557e", // rings
  "1721103418939-5112f0ccfac8", // necklaces
  "1727947074642-0bd47ef70b58", // earrings
  "1191531", // bracelets — pexels id stored as string, resolved below
  "1769116416641-e714b71851e8", // gold sets
  "1739194840257-0035eaafc61e", // bridal set
] as const;

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
  const height = Math.round(width * 1.25);
  return `https://images.unsplash.com/photo-${match[1]}?w=${width}&h=${height}&q=85&auto=format&fit=max`;
}

export const PRODUCT_IMAGE_FALLBACK = unsplashUrl(JEWELRY_UNSPLASH[0], 800);

export function productImage(index: number, width = 800): string {
  const id = PRODUCT_IDS[index % PRODUCT_IDS.length];
  return resolveImageUrl(id, width);
}

export function categoryImage(index: number, width = 600): string {
  const id = CATEGORY_UNSPLASH[index % CATEGORY_UNSPLASH.length];
  return resolveImageUrl(id, width);
}

export function heroImage(index: number, width = 1600): string {
  return unsplashUrl(HERO_UNSPLASH[index % HERO_UNSPLASH.length], width);
}

export function avatarImage(index: number, width = 100): string {
  return unsplashUrl(AVATAR_UNSPLASH[index % AVATAR_UNSPLASH.length], width);
}

export function promoImage(width = 1200): string {
  return unsplashUrl("1739194840257-0035eaafc61e", width);
}
