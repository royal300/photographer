import { Button } from '@/components/ui/Button';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import './NotFoundPage.css';

export function NotFoundPage() {
  useDocumentMeta('Page not found — Apurba Dutta Photography');
  return (
    <section className="section not-found">
      <div className="wrap">
        <span className="eyebrow">404</span>
        <h1 className="h2">
          This frame is <em>missing.</em>
        </h1>
        <p>The page you're looking for doesn't exist or has moved.</p>
        <Button to="/" arrow>
          Back to home
        </Button>
      </div>
    </section>
  );
}
