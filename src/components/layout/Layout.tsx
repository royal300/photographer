import { Outlet } from 'react-router-dom';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { Footer } from './Footer';
import { FloatingCta } from './FloatingCta';
import { Navbar } from './Navbar';
import { ScrollManager } from './ScrollManager';

export function Layout() {
  return (
    <>
      <ScrollProgressBar />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <FloatingCta />
      <ScrollIndicator />
    </>
  );
}

