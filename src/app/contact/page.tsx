import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/contact-content";
import { getSettings } from "@/services/content-service";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${BRAND_NAME}. Chat on WhatsApp or call us for fragrance advice, orders, and enquiries.`,
};

export default async function ContactPage() {
  const settings = await getSettings();

  return <ContactContent settings={settings} />;
}
