import { Outlet } from 'react-router';
import { Navigation } from './Navigation';
import { MobileTabBar } from './MobileTabBar';
import { Footer } from './Footer';
import { AnimatedBackground } from './AnimatedBackground';

export function Root() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />
      <MobileTabBar />
      <main className="relative z-10 pb-24 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}