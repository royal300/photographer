import type { Testimonial } from '@/types';

/** Placeholder reviews — replace with real client feedback. */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 'priya-rahul',
    quote: 'They made us feel so at ease that we forgot the camera was even there. Every photo looks like a frame from our own film.',
    name: 'Priya & Rahul',
    event: 'Wedding · Kolkata',
    rating: 5,
    avatar: 'avatarWoman',
  },
  {
    id: 'ananya',
    quote: "Our son's rice ceremony was chaotic in the best way, and somehow every blessing and every giggle was captured. The album brought my mother to tears.",
    name: 'Ananya Sen',
    event: 'Rice Ceremony · Kolkata',
    rating: 5,
    avatar: 'portraitPink',
  },
  {
    id: 'mehul',
    quote: 'Our pre-wedding shoot felt like a day out, not a photoshoot. The sunset frames are now framed in our living room.',
    name: 'Mehul Kapoor',
    event: 'Pre-Wedding · Digha',
    rating: 5,
    avatar: 'avatarMan',
  },
  {
    id: 'sneha',
    quote: "Booked for my daughter's birthday and loved how quietly they worked. Photos arrived early and the colours were gorgeous.",
    name: 'Sneha Das',
    event: 'Birthday · Rajarhat',
    rating: 4,
    avatar: 'avatarWoman2',
  },
];

export const RATING_SUMMARY = { score: '4.9', caption: 'Average from 300+ reviews' } as const;
