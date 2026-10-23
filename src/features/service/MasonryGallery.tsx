import { useState } from 'react';
import { photo } from '@/data/images';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { GalleryPhoto } from '@/types';
import { Lightbox } from './Lightbox';
import './MasonryGallery.css';

/** Masonry photo wall; every tile opens the full-size viewer. */
export function MasonryGallery({ photos, heading }: { photos: GalleryPhoto[]; heading: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section" id="gallery" aria-labelledby="gallery-heading">
      <div className="wrap">
        <SectionHead
          eyebrow="Gallery"
          headingId="gallery-heading"
          title={[`${heading} `, { em: 'stories.' }]}
          description="A selection from recent work. Tap any photo to view it larger."
        />
        <div className="masonry">
          {photos.map((p, i) => (
            <Reveal
              as="button"
              type="button"
              key={p.photo}
              className="mi"
              delay={i % 3}
              aria-label={`Open photo: ${p.label}`}
              onClick={() => setOpen(i)}
            >
              <img src={photo(p.photo, p.width, p.height)} width={p.width} height={p.height} alt={p.alt} loading="lazy" />
              <span>{p.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
      <Lightbox photos={photos} index={open} onChange={setOpen} />
    </section>
  );
}
