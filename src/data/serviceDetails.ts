import type { ServiceDetail } from '@/types';

/**
 * Detail pages keyed by service slug. Add an entry here (and the matching
 * slug already exists in `services.ts`) to give another service its own page.
 */
export const SERVICE_DETAILS: Readonly<Record<string, ServiceDetail>> = {
  wedding: {
    slug: 'wedding',
    seo: {
      title: 'Wedding Photography in Kolkata — Apurba Dutta Photography',
      description:
        'Candid and cinematic wedding photography in Kolkata by Apurba Dutta. See the gallery, watch wedding reels and enquire on WhatsApp.',
    },
    eyebrow: 'Wedding / Marriage',
    title: ['Weddings, told with ', { em: 'feeling.' }],
    intro:
      'Candid, cinematic coverage of every ritual, laugh and quiet moment — from the first haldi to the final farewell.',
    heroImage: 'confettiKiss',
    heroAlt: 'A couple kissing as guests throw confetti at their outdoor wedding',
    facts: [
      { value: '8+', label: 'Years behind the lens' },
      { value: '400+', label: 'Weddings covered' },
      { value: '10 days', label: 'Edited gallery delivery' },
      { value: '2', label: 'Photographers on the day' },
    ],
    coverage: {
      eyebrow: 'Coverage',
      title: ['Everything your wedding needs, ', { em: 'covered.' }],
      body: "A wedding moves fast. We stay close, stay quiet and catch what you'd otherwise miss — the grandmother's blessing, the nervous laugh, the look between the vows. Tell us your dates and venues and we'll shape the coverage around them.",
      items: [
        { title: 'Pre-wedding rituals', text: 'Haldi, mehendi and sangeet — the build-up and the family moments around it.' },
        { title: 'Ceremony coverage', text: 'Candid and traditional photography of the vows, pheras and every ritual.' },
        { title: 'Couple portraits', text: 'A relaxed portrait session in the best light of your day.' },
        { title: 'Family & guests', text: 'Group portraits, candid guests, toasts and the reception.' },
        { title: 'Edited gallery', text: 'Colour-graded images delivered in about 10 days, with a private online gallery.' },
        { title: 'Albums & prints', text: 'Printed album and framed-print options to keep the day in your hands.' },
      ],
    },
    gallery: [
      { photo: 'confettiKiss', width: 800, height: 1000, label: 'Celebration', alt: 'Bride and groom kiss amid confetti and cheering guests' },
      { photo: 'rings', width: 800, height: 560, label: 'Details', alt: "Close-up of a couple's hands with wedding rings and a bouquet" },
      { photo: 'hillCouple', width: 800, height: 640, label: 'Golden hour', alt: 'Couple embracing on a hillside at golden hour' },
      { photo: 'bouquet', width: 800, height: 900, label: 'Bouquet', alt: 'Bride holding a peach and white rose bouquet' },
      { photo: 'coupleBouquet', width: 800, height: 1000, label: 'Couple portrait', alt: 'Smiling couple posing with a bridal bouquet' },
      { photo: 'chairs', width: 800, height: 560, label: 'Venue', alt: 'Two decorated chairs on a lawn set for a wedding ceremony' },
      { photo: 'monochromeKiss', width: 800, height: 1000, label: 'Monochrome', alt: 'Black and white photograph of a couple kissing under a veil' },
      { photo: 'firstDance', width: 800, height: 900, label: 'First dance', alt: 'Bride in lace dancing with groom in a dark suit' },
      { photo: 'walkingCouple', width: 800, height: 640, label: 'Together', alt: 'Couple walking hand in hand across a hilltop' },
      { photo: 'veil', width: 800, height: 1000, label: 'Under the veil', alt: 'Couple sharing a moment under a flowing veil in a wheat field' },
      { photo: 'reception', width: 800, height: 600, label: 'Reception', alt: 'Newlyweds greeting guests beside a pool with red balloons' },
      { photo: 'outdoorBouquet', width: 800, height: 950, label: 'Outdoor', alt: 'Bride holding a wild bouquet outdoors' },
      { photo: 'holdingHands', width: 800, height: 600, label: 'Hands', alt: 'Bride and groom holding hands in soft light' },
      { photo: 'warmBouquet', width: 800, height: 1000, label: 'Warm light', alt: 'Bride holding a bouquet in warm backlight' },
      { photo: 'aisle', width: 800, height: 600, label: 'The aisle', alt: 'Floral wedding aisle lined with gold chairs' },
    ],
    reels: [
      { photo: 'confettiKiss', title: 'The Vows' },
      { photo: 'coupleBouquet', title: 'Bridal Entry' },
      { photo: 'hillCouple', title: 'Golden Hour' },
      { photo: 'veil', title: 'Under the Veil' },
      { photo: 'firstDance', title: 'First Dance' },
      { photo: 'reception', title: 'Reception Night' },
      { photo: 'rings', title: 'The Rings' },
      { photo: 'outdoorBouquet', title: 'Bouquet Toss' },
    ],
  },
};
