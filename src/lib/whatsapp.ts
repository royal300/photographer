import { SITE } from '@/data/site';
import { formatLongDate } from './format';
import { normalizeMobile, type EnquiryValues } from './validation';

/** Builds the pre-filled booking message sent to the studio on WhatsApp. */
export function buildBookingMessage(values: EnquiryValues): string {
  const mobile = normalizeMobile(values.mobile);
  const when = values.date ? formatLongDate(values.date) : 'To be decided';
  return [
    `Hello ${SITE.name}!`,
    "I'd like to book a shoot.",
    '',
    `*Name:* ${values.name.trim()}`,
    `*Mobile:* ${mobile.slice(0, 5)} ${mobile.slice(5)}`,
    `*Event date:* ${when}`,
    `*Service:* ${values.service}`,
    '',
    'Please share availability and package details. Thank you!',
  ].join('\n');
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** Opens WhatsApp in a new tab, falling back to in-page navigation if blocked. */
export function openWhatsApp(url: string): void {
  const win = window.open(url, '_blank', 'noopener');
  if (!win) window.location.href = url;
}
