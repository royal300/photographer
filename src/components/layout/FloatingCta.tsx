import { useNavScroll } from '@/hooks/useNavScroll';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import './FloatingCta.css';

/** Mobile-only "Book a Shoot" pill that slides in once the hero is scrolled past. */
export function FloatingCta() {
  const { pastHero } = useNavScroll(false);
  return (
    <Button to="/#contact" className={cn('fab', pastHero && 'is-visible')}>
      Book a Shoot
    </Button>
  );
}
