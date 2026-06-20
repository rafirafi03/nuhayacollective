import Link from "next/link";
import { Container } from "@/components/shared/container";
import { BrandLogo } from "@/components/shared/brand-logo";
import { APP_NAME, NAV_LINKS } from "@/lib/constants";
import { getSettings } from "@/services/content-service";

export async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="relative mt-auto section-oud overflow-hidden">
      <div className="absolute top-0 inset-x-0 gold-line opacity-40" />
      <Container className="relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-5">
            <BrandLogo variant="light" className="mb-5" />
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              {settings.storeDescription}
            </p>
            <div className="flex gap-4 mt-7">
              {settings.socialLinks?.instagram && (
                <Link href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-brand-gold transition-colors" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" /></svg>
                </Link>
              )}
              {settings.socialLinks?.facebook && (
                <Link href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-brand-gold transition-colors" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </Link>
              )}
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="label-caps text-brand-gold mb-5">Shop</h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li><Link href="/products" className="hover:text-white transition-colors">All Fragrances</Link></li>
              <li><Link href="/products?sort=newest" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">Collections</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="label-caps text-brand-gold mb-5">Maison</h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="label-caps text-brand-gold mb-5">Atelier</h4>
            <ul className="space-y-3 text-sm text-white/55 leading-relaxed">
              {settings.email && <li>{settings.email}</li>}
              {settings.phone && <li>{settings.phone}</li>}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.65rem] text-white/40 uppercase tracking-[0.18em]">
          <p>&copy; {new Date().getFullYear()} {settings.storeName || APP_NAME}</p>
          <div className="flex gap-6">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-brand-gold transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
