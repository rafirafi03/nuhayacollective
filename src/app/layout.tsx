import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ContactFab } from "@/components/shared/contact-fab";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { APP_NAME, APP_URL, BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";
import { generateOrganizationJsonLd } from "@/utils/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME} ${BRAND_TAGLINE} — Luxury Oud Perfumes`,
    template: `%s | ${BRAND_NAME} ${BRAND_TAGLINE}`,
  },
  description: "Discover premium oud perfumes, attars, and luxury fragrances at AM Fragrance. Shop curated Arabian oud collections with WhatsApp ordering.",
  metadataBase: new URL(APP_URL),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: APP_URL,
    siteName: APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <QueryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <ContactFab />
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
