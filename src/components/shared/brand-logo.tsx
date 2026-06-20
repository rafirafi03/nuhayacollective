import { cn } from "@/lib/utils";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";

interface BrandLogoProps {
  className?: string;
  variant?: "default" | "light";
}

export function BrandLogo({ className, variant = "default" }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-heading text-lg sm:text-xl md:text-2xl font-medium tracking-[0.18em] uppercase",
          variant === "light" ? "text-white" : "text-foreground"
        )}
      >
        {BRAND_NAME}
        <span className="font-light normal-case tracking-[0.06em] ml-1">{BRAND_TAGLINE}</span>
      </span>
      <span
        className={cn(
          "mt-1.5 label-caps tracking-[0.32em]",
          variant === "light" ? "text-white/55" : "text-muted-foreground"
        )}
      >
        Unisex Ouds
      </span>
    </span>
  );
}
