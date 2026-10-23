# Apurba Dutta Photography

Portfolio website — React 18 + TypeScript + Vite. Front-end only (no backend): bookings are handed to WhatsApp.

## Scripts

```bash
npm install      # once
npm run dev      # dev server at http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run preview  # serve the production build
npm run typecheck
```

## Project structure

```
src/
  main.tsx                    entry: router + providers + global styles
  App.tsx                     route table
  types.ts                    shared types
  data/                       all copy & content (edit here, not in components)
    site.ts                   name, phone, address, nav, social links
    images.ts                 photo catalogue + photo() URL helper
    services.ts               service list (cards, form dropdown)
    serviceDetails.ts         per-service page content (wedding)
    slides.ts · about.ts · featured.ts · arc.ts · testimonials.ts
  lib/                        pure helpers: validation, whatsapp, format, routes, dom
  hooks/                      useCarousel, useInView, useCountUp, useArcWheel, useScrollListener, ...
  providers/                  SmoothScrollProvider (Lenis), EnquiryProvider
  components/
    ui/                       Button, Icon, Reveal, SectionHead, Marquee, CarouselControls, Logo
    layout/                   Layout, Navbar, Footer, FloatingCta, ScrollManager
  features/
    home/                     Hero, About, Categories, FeaturedGallery, Testimonials, ArcGallery
    service/                  ServiceHero, Coverage, MasonryGallery, Lightbox, VideoGallery
    contact/                  BookingCta, EnquiryForm
  pages/                      HomePage, ServicePage, NotFoundPage
  styles/                     tokens.css, base.css, utilities.css (component CSS lives beside each component)
```

## Common tasks

- **Change contact details / address / hours** — `src/data/site.ts`.
- **Replace photos** — edit the IDs in `src/data/images.ts`, or make `photo()` return local files from `public/`.
- **Add a service page** — add an entry (same `slug` as in `services.ts`) to `SERVICE_DETAILS` in `src/data/serviceDetails.ts`. The card on the home page links to it automatically; services without a page jump to the booking form with the service pre-selected.
- **Add real videos** — in `src/features/service/VideoGallery.tsx`, swap the poster `<img>` for a `<video poster controls playsInline>` (9:16 files).
- **Change the heading font** — `--font-head` in `src/styles/tokens.css`.
- **Hero speed** — `--interval` on `.carousel` in `src/features/home/Hero.css` (default 3s).

## Notes

- Photos and testimonials are placeholders (Unsplash), so the site needs internet to show them.
- Reduced-motion visitors still get autoplay (with a pause button) and smooth scrolling; only parallax and looping decoration switch off.
- Deploying to a static host needs a "serve index.html for unknown routes" rule so `/services/wedding` works on refresh.
