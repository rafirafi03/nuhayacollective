import Link from "next/link";
import { Container } from "@/components/shared/container";
import { BrandLogo } from "@/components/shared/brand-logo";
import { APP_NAME, NAV_LINKS } from "@/lib/constants";
import { getSettings } from "@/services/content-service";

export async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="mt-auto bg-[#4a1220] text-[#faf6f0]">
      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10">
          <div className="col-span-2 lg:col-span-5">
            <BrandLogo variant="light" className="mb-5" />
            <p className="text-sm text-[#faf6f0]/70 leading-relaxed max-w-sm">
              {settings.storeDescription}
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="label-caps text-[#faf6f0]/55 mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm text-[#faf6f0]/75">
              <li><Link href="/products" className="hover:text-[#faf6f0] transition-colors">All Jewellery</Link></li>
              <li><Link href="/products?sort=newest" className="hover:text-[#faf6f0] transition-colors">New Arrivals</Link></li>
              <li><Link href="/categories" className="hover:text-[#faf6f0] transition-colors">Categories</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="label-caps text-[#faf6f0]/55 mb-4">Brand</h4>
            <ul className="space-y-2.5 text-sm text-[#faf6f0]/75">
              <li><Link href="/about" className="hover:text-[#faf6f0] transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-[#faf6f0] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <h4 className="label-caps text-[#faf6f0]/55 mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-[#faf6f0]/75 leading-relaxed">
              {settings.email && <li>{settings.email}</li>}
              {settings.phone && <li>{settings.phone}</li>}
              {settings.address && <li>{settings.address}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#faf6f0]/15 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[0.65rem] text-[#faf6f0]/50 uppercase tracking-[0.14em]">
            &copy; {new Date().getFullYear()} {settings.storeName || APP_NAME}
          </p>
          <div className="flex gap-6">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-[0.65rem] uppercase tracking-[0.14em] text-[#faf6f0]/50 hover:text-[#faf6f0] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
