import { useEffect, type RefObject } from 'react';

const smoothstep = (x: number) => {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
};

/** Wheel speed in full loops per second (≈ one photo every 5 seconds with 9 photos). */
const AUTO_SPEED = 0.022;
/** How quickly the wheel eases back up to speed after being released. */
const EASE_IN_PER_SECOND = 2;

/**
 * Lays the `[data-arc-item]` children of the stage along a half-ellipse and keeps
 * them turning clockwise on their own while the section is on screen.
 *
 *  - Hovering a photo (mouse) stops the wheel instantly; that photo is enlarged
 *    by CSS (`.arc-item:hover`). Moving off the photo lets the wheel pick up again.
 *  - On touch screens there is no hover, so tapping a photo pins it (stopped and
 *    enlarged via `.is-pinned`); tapping it again, or anywhere else, releases it.
 *
 * Photos fade and blur toward both ends of the arch so the loop wraps invisibly.
 * Positions are written straight to the DOM each frame — no React re-renders.
 */
export function useArcWheel(stageRef: RefObject<HTMLElement>): void {
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const items = Array.from(stage.querySelectorAll<HTMLElement>('[data-arc-item]'));
    const coarse = window.matchMedia('(hover: none)').matches;

    let count = items.length;
    let width = 0;
    let rx = 0;
    let ry = 0;
    let cy = 0;
    let phase = 0;
    let speed = 0;
    let raf = 0;
    let last = 0;
    let onScreen = false;
    let hovered = false;
    let pinned: HTMLElement | null = null;

    const layout = () => {
      width = stage.clientWidth;
      const mobile = width < 640;
      count = mobile ? Math.min(7, items.length) : items.length;
      const size = Math.round(Math.min(150, Math.max(62, width * (mobile ? 0.2 : 0.125))));
      rx = width / 2 - size / 2 - 4;
      ry = mobile ? rx * 1.25 : Math.min(rx * 0.66, 340);
      cy = ry + size * 0.62;
      stage.style.height = `${cy + size * 0.62}px`;
      stage.style.setProperty('--s', `${size}px`);
    };

    const place = () => {
      items.forEach((el, i) => {
        if (i >= count) {
          el.style.display = 'none';
          return;
        }
        el.style.display = '';
        const t = ((((i + 0.5) / count + phase) % 1) + 1) % 1;
        const theta = Math.PI * (1 - t);
        const x = width / 2 + rx * Math.cos(theta);
        const y = cy - ry * Math.sin(theta);
        const rotate = ((Math.PI / 2 - theta) * 180) / Math.PI * 0.5;
        const fade = smoothstep(Math.min(t, 1 - t) / 0.16);
        el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${rotate.toFixed(1)}deg)`;
        el.style.opacity = Math.pow(fade, 0.6).toFixed(3);
        el.style.filter = fade < 0.98 ? `blur(${((1 - fade) * 3).toFixed(1)}px)` : '';
        el.style.zIndex = String(1 + Math.round(fade * 5));
        el.style.pointerEvents = fade < 0.5 ? 'none' : '';
      });
    };

    const shouldRun = () => onScreen && !hovered && !pinned;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const target = shouldRun() ? AUTO_SPEED : 0;
      speed += (target - speed) * Math.min(1, dt * EASE_IN_PER_SECOND);
      phase = (phase + speed * dt) % 1;
      place();
      raf = target === 0 && Math.abs(speed) < 1e-5 ? 0 : requestAnimationFrame(frame);
    };

    const sync = () => {
      if (!shouldRun()) {
        speed = 0; // stop dead — a hovered photo must not drift out from under the cursor
        return;
      }
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      hovered = true;
      sync();
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      hovered = false;
      sync();
    };

    const unpin = () => {
      pinned?.classList.remove('is-pinned');
      pinned = null;
    };
    const onItemClick = (e: MouseEvent) => {
      if (!coarse) return;
      const item = e.currentTarget as HTMLElement;
      const same = pinned === item;
      unpin();
      if (!same) {
        pinned = item;
        item.classList.add('is-pinned');
      }
      sync();
    };
    const onDocPointerDown = (e: PointerEvent) => {
      if (!pinned || !(e.target instanceof Node) || pinned.contains(e.target)) return;
      unpin();
      sync();
    };

    items.forEach((el) => {
      el.addEventListener('pointerenter', onEnter);
      el.addEventListener('pointerleave', onLeave);
      el.addEventListener('click', onItemClick);
    });
    if (coarse) document.addEventListener('pointerdown', onDocPointerDown);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    io.observe(stage);

    const ro = new ResizeObserver(() => {
      layout();
      place();
    });
    ro.observe(stage.parentElement ?? stage);

    layout();
    place();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('pointerdown', onDocPointerDown);
      items.forEach((el) => {
        el.removeEventListener('pointerenter', onEnter);
        el.removeEventListener('pointerleave', onLeave);
        el.removeEventListener('click', onItemClick);
      });
    };
  }, [stageRef]);
}
