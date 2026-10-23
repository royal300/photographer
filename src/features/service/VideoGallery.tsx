import { photo } from '@/data/images';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { Reel } from '@/types';
import './VideoGallery.css';

/**
 * Vertical (9:16) reels. Videos aren't supplied yet, so each card is a poster
 * with a "coming soon" tag — replace the poster `<img>` with a
 * `<video poster controls playsInline>` when the files are ready.
 */
export function VideoGallery({ reels }: { reels: Reel[] }) {
  return (
    <section className="section light" id="videos" aria-labelledby="videos-heading">
      <div className="wrap">
        <SectionHead
          eyebrow="Reels & films"
          headingId="videos-heading"
          title={['Moments in ', { em: 'motion.' }]}
          description="Short vertical reels from our wedding days. Videos are on the way — here is a preview of the layout."
        />
        <div className="vids">
          {reels.map((reel, i) => (
            <Reveal key={reel.title} className="vid-wrap" delay={i % 4}>
              <figure className="vid">
                <img src={photo(reel.photo, 540, 960)} width={540} height={960} alt="" loading="lazy" />
                <span className="soon">Coming soon</span>
                <span className="play">
                  <Icon name="play" />
                </span>
                <figcaption>
                  <b>{reel.title}</b>
                  <small>Reel · 9:16</small>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
