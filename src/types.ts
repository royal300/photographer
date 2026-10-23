import type { PhotoKey } from '@/data/images';

/** Heading copy where `{ em }` segments are rendered as italic accents. */
export type RichText = ReadonlyArray<string | { em: string }>;

export interface Cta {
  label: string;
  to: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: RichText;
  text: string;
  image: PhotoKey;
  imageAlt: string;
  polaroid: PhotoKey;
  chip: string;
  primary: Cta;
  secondary: Cta;
}

export interface Service {
  slug: string;
  title: string;
  blurb: string;
  image: PhotoKey;
}

export interface Stat {
  value: number;
  label: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  event: string;
  rating: number;
  avatar: PhotoKey;
}

export interface FeaturedFrame {
  photo: PhotoKey;
  alt: string;
  caption: string;
  /** White "print" border. */
  print?: boolean;
  /** Large lead frame of the spread. */
  main?: boolean;
}

export interface FeaturedSpread {
  id: 'a' | 'b' | 'c';
  frames: FeaturedFrame[];
}

export interface GalleryPhoto {
  photo: PhotoKey;
  width: number;
  height: number;
  label: string;
  alt: string;
}

export interface Reel {
  photo: PhotoKey;
  title: string;
}

export interface CoverageItem {
  title: string;
  text: string;
}

export interface ServiceDetail {
  slug: string;
  seo: { title: string; description: string };
  eyebrow: string;
  title: RichText;
  intro: string;
  heroImage: PhotoKey;
  heroAlt: string;
  facts: { value: string; label: string }[];
  /** Single "what we cover" section (no tiered packages). */
  coverage: {
    eyebrow: string;
    title: RichText;
    body: string;
    items: CoverageItem[];
  };
  gallery: GalleryPhoto[];
  reels: Reel[];
}
