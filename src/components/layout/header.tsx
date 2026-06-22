"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, Menu, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
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
  const [scrolled, setScrolled] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const isHome = pathname === "/";
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
  });

  useEffect(() => {
    setScrolled(window.scrollY > 60);
  }, [pathname]);

  const onHero = isHome && !scrolled;

  const iconClass = onHero
    ? "text-[#faf6f0] hover:bg-[#faf6f0]/10"
    : "text-[#4a1220] hover:bg-[#f5f0e8]";

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        onHero
          ? "bg-transparent border-b border-[#faf6f0]/10 backdrop-blur-[2px]"
          : "bg-[#faf6f0]/98 backdrop-blur-xl border-b border-[#dccfc4]"
      )}
    >
      <Container>
        <div className="flex h-[3.75rem] sm:h-16 items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="icon"
            className={cn("lg:hidden rounded-full size-9", iconClass)}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden lg:flex items-center gap-8 flex-1">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[0.62rem] uppercase tracking-[0.22em] font-medium transition-colors",
                  onHero
                    ? pathname === link.href
                      ? "text-[#faf6f0]"
                      : "text-[#faf6f0]/65 hover:text-[#faf6f0]"
                    : pathname === link.href
                      ? "text-[#4a1220]"
                      : "text-muted-foreground hover:text-[#4a1220]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <BrandLogo compact variant={onHero ? "light" : "wine"} />
          </Link>

          <div className="flex items-center gap-0.5 flex-1 justify-end">
            <div className="hidden md:block max-w-[200px] lg:max-w-[220px]">
              <SearchBar
                className={cn(
                  onHero
                    ? "[&_input]:bg-[#faf6f0]/10 [&_input]:border-[#faf6f0]/20 [&_input]:text-[#faf6f0] [&_input]:placeholder:text-[#faf6f0]/45"
                    : "[&_input]:bg-[#f5f0e8] [&_input]:border-[#dccfc4]",
                  "[&_input]:rounded-sm"
                )}
              />
            </div>
            <Button variant="ghost" size="icon" className={cn("relative rounded-full size-9 md:hidden", iconClass)} asChild>
              <Link href="/products" aria-label="Search">
                <Search className="h-[1.1rem] w-[1.1rem]" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className={cn("relative rounded-full size-9", iconClass)} asChild>
              <Link href="/wishlist" aria-label="Wishlist">
                <Heart className="h-[1.1rem] w-[1.1rem] stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className={cn(
                    "absolute -top-0.5 -right-0.5 h-4 min-w-4 px-0.5 rounded-full text-[9px] flex items-center justify-center font-medium",
                    onHero ? "bg-[#faf6f0] text-[#4a1220]" : "bg-[#4a1220] text-[#faf6f0]"
                  )}>
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("relative rounded-full size-9", iconClass)}
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
            >
              <ShoppingBag className="h-[1.1rem] w-[1.1rem] stroke-[1.5]" />
              {itemCount > 0 && (
                <span className={cn(
                  "absolute -top-0.5 -right-0.5 h-4 min-w-4 px-0.5 rounded-full text-[9px] flex items-center justify-center font-medium",
                  onHero ? "bg-[#faf6f0] text-[#4a1220]" : "bg-[#4a1220] text-[#faf6f0]"
                )}>
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </Container>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger className="sr-only">Menu</SheetTrigger>
        <SheetContent side="left" className="w-full max-w-[min(100vw,20rem)] border-r border-[#dccfc4] bg-[#faf6f0] p-5">
          <div className="flex flex-col gap-6 mt-4">
            <BrandLogo />
            <SearchBar inlineResults onNavigate={() => setMobileOpen(false)} />
            <nav className="flex flex-col gap-1 border-t border-[#dccfc4] pt-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "font-heading text-2xl py-2.5 px-3 transition-colors",
                    pathname === link.href ? "text-[#4a1220]" : "text-[#2a1218] hover:text-[#4a1220]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </motion.header>
  );
}
