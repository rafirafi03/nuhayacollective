"use client";

import { cn } from "@/lib/utils";
import type { Product, ProductColor } from "@/types";
import { getProductVolumes, getVariantStock } from "@/lib/fragrance-variants";

interface VariantSelectorProps {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
}

export function VariantSelector({
  product,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}: VariantSelectorProps) {
  const volumes = getProductVolumes(product);
  const concentrations = product.colors ?? [];

  return (
    <div className="space-y-5 mb-6">
      {concentrations.length > 0 && (
        <div>
          <p className="label-caps mb-3">
            Colour — <span className="text-foreground normal-case tracking-normal font-medium">{selectedColor}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {concentrations.map((conc: ProductColor) => {
              const inStock = volumes.some((vol) => getVariantStock(product, vol, conc.name) > 0);
              const isSelected = selectedColor === conc.name;
              return (
                <button
                  key={conc.name}
                  type="button"
                  disabled={!inStock}
                  onClick={() => onColorChange(conc.name)}
                  className={cn(
                    "px-4 h-10 rounded-full border text-xs sm:text-sm font-medium transition-colors",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border/80 hover:border-primary/40 text-foreground",
                    !inStock && "opacity-40 cursor-not-allowed line-through"
                  )}
                >
                  {conc.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <p className="label-caps mb-3">
          Size — <span className="text-foreground normal-case tracking-normal font-medium">{selectedSize}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {volumes.map((volume) => {
            const stock = selectedColor
              ? getVariantStock(product, volume, selectedColor)
              : product.stock;
            const available = stock > 0;
            const isSelected = selectedSize === volume;
            return (
              <button
                key={volume}
                type="button"
                disabled={!available}
                onClick={() => onSizeChange(volume)}
                className={cn(
                  "min-w-[3.5rem] h-10 px-3 rounded-full border text-sm font-medium transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border/80 hover:border-primary/40 text-foreground",
                  !available && "opacity-40 line-through cursor-not-allowed"
                )}
              >
                {volume}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Premium fabrics · Size guidance on WhatsApp
        </p>
      </div>
    </div>
  );
}
