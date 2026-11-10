import React, { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import IntroTransition, { SiteStage } from './components/IntroTransition';
import SeoController from './utils/SeoController';
import AnalyticsConsent from './utils/AnalyticsConsent';
import { initializeAnalytics, trackCtaClick, trackPageView } from './utils/analytics';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const Home = lazy(() => import('./pages/Home'));
const Programs = lazy(() => import('./pages/Programs'));
const AIForEveryone = lazy(() => import('./pages/AIForEveryone'));
const Solutions = lazy(() => import('./pages/Solutions'));
const CareerPaths = lazy(() => import('./pages/CareerPaths'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));

function AnalyticsController() {
  const { pathname } = useLocation();
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/';
  useEffect(() => {
    const listener = (event) => {
      const target = event.target.closest('a.btn, button.btn');
      if (!target) return;
      const label = target.textContent.trim().replace(/\s+/g, ' ').slice(0, 80);
      const href = target.getAttribute('href');
      trackCtaClick(label, href || 'button');
    };
    document.addEventListener('click', listener, true);
    return () => document.removeEventListener('click', listener, true);
  }, []);
  useEffect(() => {
    let active = true;
    initializeAnalytics().then((ready) => { if (ready && active) trackPageView(normalizedPath); });
    return () => { active = false; };
  }, [normalizedPath]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const [hydrated, setHydrated] = useState(false);
  const introEligible = pathname === '/' && hydrated;
  const [stage, setStage] = useState('ready');

  useIsomorphicLayoutEffect(() => setHydrated(true), []);
  useIsomorphicLayoutEffect(() => {
    setStage(introEligible ? 'waiting' : 'ready');
  }, [introEligible]);

  return (
    <>
      <AnalyticsController />
      <SeoController />
      <AnalyticsConsent />
      {introEligible && <IntroTransition onReveal={() => setStage('entering')} />}
      <SiteStage state={stage}>
        <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading…</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/ai-for-everyone" element={<AIForEveryone />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/career-paths" element={<CareerPaths />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Legal title="Terms of Service" />} />
              <Route path="/privacy" element={<Legal title="Privacy Policy" />} />
              <Route path="/cookies" element={<Legal title="Cookie Policy" />} />
              <Route path="*" element={<Legal title="Page Not Found" />} />
            </Route>
          </Routes>
        </Suspense>
      </SiteStage>
    </>
  );
}
