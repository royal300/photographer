import type { FeaturedSpread } from '@/types';

/** Three editorial spreads for the home-page featured carousel. */
export const FEATURED_SPREADS: readonly FeaturedSpread[] = [
  {
    id: 'a',
    frames: [
      { photo: 'confettiKiss', main: true, alt: 'Bride and groom kiss amid confetti and cheering guests', caption: 'Wedding · Kolkata' },
      { photo: 'rings', print: true, alt: "Close-up of a couple's hands with wedding rings and a bouquet", caption: 'Details' },
      { photo: 'bouquet', print: true, alt: 'Bride holding a peach and white rose bouquet', caption: 'Bouquet' },
      { photo: 'holdingHands', alt: 'Bride and groom holding hands in soft light', caption: 'Hands & hearts' },
    ],
  },
  {
    id: 'b',
    frames: [
      { photo: 'hillCouple', main: true, alt: 'Couple embracing on a hillside at golden hour', caption: 'Pre-wedding · Golden hour' },
      { photo: 'veil', print: true, alt: 'Couple sharing a moment under a flowing veil in a wheat field', caption: 'Veil' },
      { photo: 'firstDance', print: true, alt: 'Bride in lace dancing with groom in a dark suit', caption: 'First dance' },
      { photo: 'outdoorBouquet', alt: 'Bride holding a wild bouquet outdoors', caption: 'Outdoor' },
    ],
  },
  {
    id: 'c',
    frames: [
      { photo: 'monochromeKiss', main: true, alt: 'Black and white photograph of a couple kissing under a veil', caption: 'Monochrome' },
      { photo: 'heartHands', print: true, alt: 'Heart shape made by two pairs of hands against a sunset', caption: 'Engagement' },
      { photo: 'reception', print: true, alt: 'Newlyweds greeting guests beside a pool with red balloons', caption: 'Reception' },
      { photo: 'chairs', alt: 'Two decorated chairs on a lawn set for a wedding ceremony', caption: 'Venue' },
      { photo: 'warmBouquet', print: true, alt: 'Bride holding a bouquet in warm backlight', caption: 'Warm light' },
    ],
  },
];
