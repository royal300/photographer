import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, SPY_IDS, type NavLink } from '@/data/site';
import { useNavScroll } from '@/hooks/useNavScroll';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import './Navbar.css';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const isHome = pathname === '/';
  const { scrolled, hidden } = useNavScroll(open);
  const spyActive = useScrollSpy(SPY_IDS, isHome);

  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (link: NavLink) =>
    isHome ? spyActive === link.spy : pathname.startsWith('/services') && link.spy === 'categories';

  return (
    <header className={cn('nav', scrolled && 'is-scrolled', hidden && 'is-hidden')}>
      <div className="wrap nav-in">
        <Logo />
        <nav className={cn('links', open && 'open')} id="menu" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.to} aria-current={isActive(link) ? 'true' : undefined}>
              {link.label}
            </Link>
          ))}
          <Button to="/#contact" className="menu-cta">
            Book a Shoot
          </Button>
        </nav>
        <div className="nav-cta">
          <Button to="/#contact" size="sm">
            Book a Shoot
          </Button>
          <button
            type="button"
            className="burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
