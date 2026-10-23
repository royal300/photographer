import { Marquee } from '@/components/ui/Marquee';
import { About } from '@/features/home/About';
import { ArcGallery } from '@/features/home/ArcGallery';
import { Categories } from '@/features/home/Categories';
import { FeaturedGallery } from '@/features/home/FeaturedGallery';
import { Hero } from '@/features/home/Hero';
import { Testimonials } from '@/features/home/Testimonials';

const MARQUEE_ITEMS = ['Weddings', 'Pre-Wedding', 'Rice Ceremony', 'Birthdays', 'Events', 'Portraits'] as const;

export function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <About />
      <Categories />
      <FeaturedGallery />
      <Testimonials />
      <ArcGallery />
    </>
  );
}
