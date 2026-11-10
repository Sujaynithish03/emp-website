import { useEffect, useState } from 'react';
import { setAnalyticsConsent } from './analytics';

export default function AnalyticsConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) return undefined;
    const stored = (() => { try { return window.localStorage.getItem('empoweredcareers.analytics-consent'); } catch { return null; } })();
    if (stored === null) setVisible(true);
    const open = () => setVisible(true);
    window.addEventListener('open-analytics-consent', open);
    return () => window.removeEventListener('open-analytics-consent', open);
  }, []);
  if (!visible || !import.meta.env.VITE_GA_MEASUREMENT_ID) return null;

  const choose = (granted) => {
    if (setAnalyticsConsent(granted)) setVisible(false);
  };
  return (
    <aside role="region" aria-label="Analytics cookie preferences" style={{ position: 'fixed', zIndex: 1000, left: '50%', bottom: '16px', transform: 'translateX(-50%)', width: 'min(680px, calc(100vw - 32px))', padding: '18px 20px', borderRadius: '14px', background: '#0F2B22', color: '#fff', boxShadow: '0 12px 40px rgba(0,0,0,.28)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap' }}>
      <p style={{ margin: 0, flex: '1 1 300px', fontSize: '14px', lineHeight: 1.5 }}>Allow analytics cookies to help us understand how visitors use this website. We do not send your form details to Google Analytics.</p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button type="button" onClick={() => choose(false)} style={{ border: '1px solid rgba(255,255,255,.55)', borderRadius: '999px', padding: '9px 14px', color: '#fff', fontSize: '13px' }}>Decline</button>
        <button type="button" onClick={() => choose(true)} style={{ border: 0, borderRadius: '999px', padding: '9px 14px', background: '#F6DB2D', color: '#0F2B22', fontWeight: 700, fontSize: '13px' }}>Allow analytics</button>
      </div>
    </aside>
  );
}
