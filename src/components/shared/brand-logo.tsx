import { cn } from "@/lib/utils";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";

interface BrandLogoProps {
  className?: string;
  variant?: "default" | "light" | "wine";
  compact?: boolean;
}

export function BrandLogo({ className, variant = "default", compact = false }: BrandLogoProps) {
  const isLight = variant === "light";
  const isWine = variant === "wine";

  if (compact) {
    return (
      <span className={cn("inline-flex flex-col items-center leading-none text-center", className)}>
        <span
          className={cn(
            "font-heading text-base sm:text-lg font-normal tracking-[0.08em] lowercase",
            isLight ? "text-[#faf6f0]" : isWine ? "text-[#4a1220]" : "text-[#4a1220]"
          )}
        >
          {BRAND_NAME}
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.32em] font-medium",
            isLight ? "text-[#faf6f0]/55" : "text-muted-foreground"
          )}
        >
          {BRAND_TAGLINE}
        </span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-heading text-2xl sm:text-3xl font-normal tracking-wide lowercase",
          isLight ? "text-[#faf6f0]" : "text-[#2a1218]"
        )}
      >
        {BRAND_NAME}
      </span>
      <span
        className={cn(
          "mt-1 label-caps tracking-[0.28em]",
          isLight ? "text-[#faf6f0]/55" : "text-muted-foreground"
        )}
      >
        {BRAND_TAGLINE} · fine jewellery
      </span>
    </span>
  );
}
