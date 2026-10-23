export const SITE = {
  name: 'Apurba Dutta Photography',
  shortName: 'Apurba Dutta',
  tagline: 'Photography',
  description:
    'Cinematic, candid photography for weddings, ceremonies and celebrations across Kolkata and beyond — made to be felt, not just seen.',
  phoneDisplay: '+91 98316 51264',
  phoneTel: '+919831651264',
  whatsappNumber: '919831651264',
  addressLines: ['SRCM Rd, Chotto Chandpur, Bishnupur,', 'Rajarhat, Kolkata, WB 700135'],
  hours: 'Mon – Sat, 10am – 7pm',
  year: new Date().getFullYear(),
} as const;

export interface NavLink {
  label: string;
  to: string;
  /** Section id used by the scroll-spy on the home page. */
  spy: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', to: '/', spy: 'top' },
  { label: 'Services', to: '/#categories', spy: 'categories' },
  { label: 'Portfolio', to: '/#gallery', spy: 'gallery' },
  { label: 'About', to: '/#about', spy: 'about' },
  { label: 'Contact', to: '/#contact', spy: 'contact' },
];

export const SPY_IDS = NAV_LINKS.map((l) => l.spy);

export type SocialName = 'instagram' | 'facebook' | 'youtube' | 'whatsapp';

export const SOCIAL_LINKS: readonly { name: SocialName; label: string; href: string; external: boolean }[] = [
  { name: 'instagram', label: 'Instagram', href: '#', external: false },
  { name: 'facebook', label: 'Facebook', href: '#', external: false },
  { name: 'youtube', label: 'YouTube', href: '#', external: false },
  { name: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${SITE.whatsappNumber}`, external: true },
];
