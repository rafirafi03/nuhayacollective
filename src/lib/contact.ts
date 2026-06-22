import { APP_NAME, CONTACT_PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/constants";

export { CONTACT_PHONE_DISPLAY };

export function getTelHref(phone: string = WHATSAPP_NUMBER): string {
  return `tel:+${phone}`;
}

export function getWhatsAppHref(
  message = `Hello ${APP_NAME}, I'd like to get in touch.`,
  phone: string = WHATSAPP_NUMBER
): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
