import type { Product } from "@/types";

export const FRAGRANCE_VOLUMES = ["12ml", "30ml", "50ml", "100ml"] as const;

export type FragranceVolume = (typeof FRAGRANCE_VOLUMES)[number];

export function getCartLineId(productId: string, size?: string, color?: string) {
  return `${productId}::${size || "default"}::${color || "default"}`;
}

/** sizes field stores fragrance volumes (e.g. 50ml, 100ml) */
export function getProductVolumes(product: Product): string[] {
  if (product.sizes?.length) return product.sizes;
  return [...FRAGRANCE_VOLUMES];
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
