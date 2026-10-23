import { useParams } from 'react-router-dom';
import { SERVICE_DETAILS } from '@/data/serviceDetails';
import { SERVICES } from '@/data/services';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { Coverage } from '@/features/service/Coverage';
import { MasonryGallery } from '@/features/service/MasonryGallery';
import { ServiceHero } from '@/features/service/ServiceHero';
import { VideoGallery } from '@/features/service/VideoGallery';
import { NotFoundPage } from './NotFoundPage';

/** Data-driven service page: add an entry to `SERVICE_DETAILS` to publish another. */
export function ServicePage() {
  const { slug = '' } = useParams();
  const detail = SERVICE_DETAILS[slug];
  useDocumentMeta(detail?.seo.title, detail?.seo.description);

  if (!detail) return <NotFoundPage />;

  const service = SERVICES.find((s) => s.slug === detail.slug);
  const heading = service?.title.split(' ')[0] ?? detail.eyebrow;

  return (
    <>
      <ServiceHero detail={detail} />
      <Coverage coverage={detail.coverage} serviceSlug={detail.slug} />
      <MasonryGallery photos={detail.gallery} heading={heading} />
      <VideoGallery reels={detail.reels} />
    </>
  );
}
