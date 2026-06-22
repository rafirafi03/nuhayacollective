import type { Product } from "@/types";

export const ABAYA_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
/** @deprecated use ABAYA_SIZES */
export const JEWELRY_RING_SIZES = [...ABAYA_SIZES] as const;
export const JEWELRY_CHAIN_LENGTHS = [...ABAYA_SIZES] as const;
/** @deprecated */
export const FRAGRANCE_VOLUMES = [...ABAYA_SIZES] as const;

export type AbayaSize = (typeof ABAYA_SIZES)[number];
/** @deprecated */
export type JewelryRingSize = AbayaSize;
/** @deprecated */
export type FragranceVolume = AbayaSize;

export function getCartLineId(productId: string, size?: string, color?: string) {
  return `${productId}::${size || "default"}::${color || "default"}`;
}

export function getProductVolumes(product: Product): string[] {
  if (product.sizes?.length) return product.sizes;
  return [...ABAYA_SIZES];
}

/** @deprecated use getProductVolumes */
export const getProductSizes = getProductVolumes;

export function getVariantStock(product: Product, volume: string, concentration: string): number {
  const match = product.variantStock?.find((v) => v.size === volume && v.color === concentration);
  if (match) return match.stock;
  if (product.variantStock?.length) return 0;
  return product.stock;
}

export function isVariantInStock(product: Product, volume: string, concentration: string): boolean {
  return getVariantStock(product, volume, concentration) > 0;
}

export function productHasVariants(product: Product): boolean {
  return Boolean(product.sizes?.length || product.colors?.length);
}
