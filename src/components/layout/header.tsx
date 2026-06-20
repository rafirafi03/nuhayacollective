"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, Menu } from "lucide-react";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchBar } from "@/components/search/search-bar";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { NAV_LINKS } from "@/lib/constants";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement bar */}
      <div className="bg-brand-oud text-white/75 text-center text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.22em] py-2 px-4 border-b border-white/8">
        Unisex oud & niche fragrances · WhatsApp ordering available
      </div>

      <div className="border-b border-border bg-card/92 backdrop-blur-xl supports-backdrop-filter:bg-card/80">
        <Container className="px-3 sm:px-6">
          <div className="flex h-[3.75rem] sm:h-[4.25rem] md:h-[4.75rem] items-center justify-between gap-3 min-w-0">
            <Link href="/" className="flex items-center shrink-0 min-w-0 max-w-[48%] sm:max-w-none">
              <BrandLogo />
            </Link>

            <nav className="hidden lg:flex items-center gap-8 xl:gap-10 shrink-0">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative label-caps transition-colors whitespace-nowrap py-1",
                    pathname === link.href
                      ? "text-foreground after:absolute after:-bottom-1 after:inset-x-0 after:h-px after:bg-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex flex-1 justify-end min-w-0 max-w-xs lg:max-w-sm mx-3">
              <SearchBar />
            </div>

            <div className="flex items-center gap-0.5 shrink-0">
              <Button variant="ghost" size="icon" className="relative rounded-full size-9" asChild>
                <Link href="/wishlist" aria-label="Wishlist">
                  <Heart className="h-[1.1rem] w-[1.1rem] stroke-[1.4]" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-0.5 rounded-full bg-brand-gold text-[9px] text-brand-espresso flex items-center justify-center font-semibold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full size-9"
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
              >
                <ShoppingBag className="h-[1.1rem] w-[1.1rem] stroke-[1.4]" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-0.5 rounded-full bg-brand-gold text-[9px] text-brand-espresso flex items-center justify-center font-semibold">
                    {itemCount}
                  </span>
                )}
              </Button>
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "lg:hidden rounded-full size-9")}>
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-[min(100vw,20rem)] border-l border-border/60 bg-brand-cream p-5 overflow-y-auto">
                  <div className="flex flex-col gap-7 mt-6 pb-4">
                    <BrandLogo />
                    <SearchBar inlineResults onNavigate={() => setMobileOpen(false)} />
                    <nav className="flex flex-col gap-1 border-t border-border/60 pt-6">
                      {NAV_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "font-heading text-2xl py-2 transition-colors",
                            pathname === link.href ? "text-brand-amber" : "text-foreground hover:text-brand-amber"
                          )}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
