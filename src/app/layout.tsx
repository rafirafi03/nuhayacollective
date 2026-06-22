import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ContactFab } from "@/components/shared/contact-fab";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { APP_NAME, APP_URL, BRAND_NAME, BRAND_TAGLINE, BRAND_LOGO_PATH } from "@/lib/constants";
import { generateOrganizationJsonLd, brandShareImageMetadata } from "@/utils/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteDescription = `Discover premium abayas at ${BRAND_NAME} — ${BRAND_TAGLINE}. Open, closed, kimono, and embroidered styles with WhatsApp ordering.`;

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — Premium Modest Wear`,
    template: `%s | ${APP_NAME}`,
  },
  description: siteDescription,
  metadataBase: new URL(APP_URL),
  icons: {
    icon: [{ url: BRAND_LOGO_PATH, type: "image/jpeg" }],
    apple: [{ url: BRAND_LOGO_PATH, type: "image/jpeg" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} — Premium Modest Wear`,
    description: siteDescription,
    images: [brandShareImageMetadata],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — Premium Modest Wear`,
    description: siteDescription,
    images: [brandShareImageMetadata],
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
