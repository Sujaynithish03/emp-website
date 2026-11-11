import { SITE_URL } from './seoConfig';

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const GTM_ID = import.meta.env.VITE_GTM_CONTAINER_ID;
const CONSENT_KEY = 'empoweredcareers.analytics-consent';
let initialized = false;
let lastPageView = '';
let scriptPromise;

function hasConsent() {
  try { return window.localStorage.getItem(CONSENT_KEY) === 'granted'; } catch { return false; }
}

export function initializeAnalytics() {
  if (typeof window === 'undefined' || (!GA_ID && !GTM_ID) || !hasConsent()) return Promise.resolve(false);
  if (initialized) return scriptPromise || Promise.resolve(true);
  initialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });

  scriptPromise = new Promise((resolve) => {
    const scriptUrl = GTM_ID
      ? `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`
      : `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
    const existing = document.querySelector(`script[src^="${scriptUrl}"]`);
    if (existing) { resolve(true); return; }
    const script = document.createElement('script');
    script.async = true;
    script.src = scriptUrl;
    if (GTM_ID) {
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    } else {
      window.gtag('config', GA_ID, { send_page_view: false });
    }
    script.onload = () => resolve(true);
    script.onerror = () => {
      initialized = false;
      scriptPromise = undefined;
      resolve(false);
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export function trackPageView(path = window.location.pathname) {
  if (!initialized || !hasConsent() || !window.gtag || path === lastPageView) return;
  lastPageView = path;
  window.gtag('event', 'page_view', { page_title: document.title, page_location: `${SITE_URL}${path}`, page_path: path });
}

export function trackEvent(name, params = {}) {
  if (!initialized || !hasConsent() || !window.gtag) return;
  window.gtag('event', name, params);
}

export function trackCtaClick(label, destination = 'button') {
  trackEvent('cta_click', { label: String(label).slice(0, 80), destination: String(destination).slice(0, 120) });
}

export function trackContactSubmission() {
  trackEvent('generate_lead', { form_name: 'contact_form' });
}

export function setAnalyticsConsent(granted) {
  try { window.localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied'); } catch { return false; }
  if (!granted) {
    if (initialized && window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
    lastPageView = '';
    return true;
  }
  if (initialized && window.gtag) {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    trackPageView();
  } else initializeAnalytics().then((ready) => { if (ready) trackPageView(); });
  return true;
}

export function hasAnalyticsConsent() { return hasConsent(); }
