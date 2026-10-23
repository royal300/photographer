import type { Service } from '@/types';

/**
 * Every bookable service. The first `PRIMARY_SERVICE_COUNT` appear on the home
 * page by default; the rest are revealed by "View All Categories".
 * A service gets its own page as soon as an entry with the same slug exists in
 * `serviceDetails.ts`.
 */
export const SERVICES: readonly Service[] = [
  { slug: 'wedding', title: 'Wedding / Marriage', blurb: 'Full-day candid & cinematic coverage', image: 'coupleBouquet' },
  { slug: 'rice-ceremony', title: 'Rice Ceremony', blurb: 'Annaprashan, beautifully kept', image: 'table' },
  { slug: 'pre-wedding', title: 'Pre-Wedding', blurb: 'Outdoor & destination shoots', image: 'walkingCouple' },
  { slug: 'birthday', title: 'Birthday', blurb: "Kids' & milestone parties", image: 'cake' },
  { slug: 'party-events', title: 'Party & Events', blurb: 'Receptions, sangeet, get-togethers', image: 'toast' },
  { slug: 'engagement', title: 'Engagement', blurb: 'Ring ceremony & couple stories', image: 'heartHands' },
  { slug: 'portraits', title: 'Portraits', blurb: 'Personal & portfolio shoots', image: 'portraitPink' },
  { slug: 'maternity-fashion', title: 'Maternity & Fashion', blurb: 'Editorial looks, natural light', image: 'roadPortrait' },
  { slug: 'concerts-corporate', title: 'Concerts & Corporate', blurb: 'Stage, launches & conferences', image: 'stageConfetti' },
];

export const PRIMARY_SERVICE_COUNT = 5;

/** Values offered in the enquiry form's service dropdown. */
export const SERVICE_OPTIONS = SERVICES.map((s) => s.title);
