import type { Product } from "@/types";

export const JEWELRY_RING_SIZES = ["6", "7", "8", "9", "10"] as const;
export const JEWELRY_CHAIN_LENGTHS = ['16"', '18"', '20"', '22"'] as const;
/** @deprecated use product-specific sizes */
export const FRAGRANCE_VOLUMES = [...JEWELRY_RING_SIZES] as const;

export type JewelryRingSize = (typeof JEWELRY_RING_SIZES)[number];
/** @deprecated */
export type FragranceVolume = JewelryRingSize;

export function getCartLineId(productId: string, size?: string, color?: string) {
  return `${productId}::${size || "default"}::${color || "default"}`;
}

/** sizes field stores ring size or chain length */
export function getProductVolumes(product: Product): string[] {
  if (product.sizes?.length) return product.sizes;
  return [...JEWELRY_RING_SIZES];
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
