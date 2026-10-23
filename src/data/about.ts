import type { RichText, Stat } from '@/types';

/** Placeholder figures — replace with real numbers. */
export const ABOUT = {
  eyebrow: 'About the photographer',
  title: ["I don't just take photos. I keep ", { em: 'feelings' }, ' alive.'] as RichText,
  body: "Hi, I'm Apurba — a storyteller with a camera. For eight years I've chased the quiet moments that happen between the poses: a father's proud glance, a nervous giggle, a grandmother's blessing. Your photographs should feel like your day did.",
  portraitAlt: 'Portrait of Apurba Dutta, the photographer, smiling with arms crossed in a field of tall grass',
  experienceYears: 8,
} as const;

export const ABOUT_STATS: readonly Stat[] = [
  { value: 8, label: 'Years of experience' },
  { value: 1200, label: 'Photoshoots completed' },
  { value: 950, label: 'Happy clients' },
];
