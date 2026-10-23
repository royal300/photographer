import { useEffect, useRef, type KeyboardEvent } from 'react';
import { photo } from '@/data/images';
import { pad2 } from '@/lib/format';
import { useSmoothScroll } from '@/providers/SmoothScrollProvider';
import { Icon } from '@/components/ui/Icon';
import type { GalleryPhoto } from '@/types';
import './Lightbox.css';

interface LightboxProps {
  photos: GalleryPhoto[];
  /** Index of the open photo, or `null` when closed. */
  index: number | null;
  onChange: (index: number | null) => void;
}

/** Full-screen photo viewer built on the native `<dialog>` (focus trap + Esc for free). */
export function Lightbox({ photos, index, onChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { stop, start } = useSmoothScroll();
  const isOpen = index !== null;
  const current = index !== null ? photos[index] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      stop();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
    return () => start();
  }, [isOpen, start, stop]);

  const step = (delta: number) => index !== null && onChange((index + delta + photos.length) % photos.length);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };

  return (
    <dialog
      ref={dialogRef}
      className="lb"
      aria-label="Photo viewer"
      onClose={() => onChange(null)}
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
      onKeyDown={onKeyDown}
    >
      {current && (
        <>
          <button type="button" className="lb-x" aria-label="Close viewer" onClick={() => onChange(null)}>
            <Icon name="close" />
          </button>
          <button type="button" className="lb-p" aria-label="Previous photo" onClick={() => step(-1)}>
            <Icon name="left" />
          </button>
          <img key={current.photo} src={photo(current.photo, 1600)} alt={current.alt} />
          <button type="button" className="lb-n" aria-label="Next photo" onClick={() => step(1)}>
            <Icon name="arrow" />
          </button>
          <div className="lb-c" aria-hidden="true">
            {pad2((index ?? 0) + 1)} / {pad2(photos.length)}
          </div>
        </>
      )}
    </dialog>
  );
}
