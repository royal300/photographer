import { useRef } from 'react';
import { ARC_PHOTOS } from '@/data/arc';
import { photo } from '@/data/images';
import { useArcWheel } from '@/hooks/useArcWheel';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import './ArcGallery.css';

/**
 * Photo wheel above the footer. Photos sit on a half-ellipse around the
 * heading and turn clockwise on their own; the two at the ends are faded and
 * blurred. Hovering a photo stops the wheel and enlarges that photo.
 */
export function ArcGallery() {
  const stageRef = useRef<HTMLDivElement>(null);
  useArcWheel(stageRef);

  return (
    <section className="arc" id="moments" aria-labelledby="arc-heading">
      <Reveal variant="zoom" className="arc-reveal">
        <div ref={stageRef} className="arc-stage">
          <ul className="arc-items" aria-hidden="true">
            {ARC_PHOTOS.map((key) => (
              <li key={key} className="arc-item" data-arc-item>
                <img src={photo(key, 360, 360)} width={360} height={360} alt="" loading="lazy" draggable={false} />
              </li>
            ))}
          </ul>
          <div className="arc-center">
            <span className="eyebrow">Moments</span>
            <h2 className="h2" id="arc-heading">
              Every frame
              <br />
              <em>tells a story</em>
            </h2>
            <p>A wheel of favourites from weddings, couple shoots and celebrations.</p>
            <Button to="/services/wedding#gallery" arrow>
              Explore Portfolio
            </Button>
            <span className="arc-hint">Hover a photo to pause and enlarge</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
