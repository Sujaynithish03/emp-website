import { useCallback, useEffect, useRef, useState } from 'react';
import './IntroTransition.css';

/* --------------------------------------------------------------------------
   Full-screen intro film that fades away to reveal the live site.

   Beat map of the film, in seconds:
     0.0  hands enter from both sides
     2.0  the clasp lands
     3.5  the mark builds around the handshake
     4.7  "EmpowerED" wipes in
    11.3  light sweep, the world turns white
    12.0  lockup settles      <- the intro fades away just after this
   -------------------------------------------------------------------------- */
const DEFAULT_TRANSITION_AT = 12.55;
const FALLBACK_RUNTIME = 3400;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* sessionStorage throws in some embedded and privacy contexts. Never let a
   storage failure cost someone the site. */
const store = {
  get(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      /* no-op */
    }
  },
};


export default function IntroTransition({
  mp4 = '/assets/empowered-intro.mp4',
  mp4Mobile = '/assets/empowered-intro-mobile.mp4',
  webm = '/assets/empowered-intro.webm',
  poster = '/assets/intro-poster.jpg',
  logoFull = '/assets/logo-full.png',
  logoMark = '/assets/logo-mark.png',
  transitionAt = DEFAULT_TRANSITION_AT,
  playbackRate = 1,
  once = 'session', // 'session' | 'always' | 'never'
  storageKey = 'empowered:intro-played',
  onReveal,
  onDone,
}) {
  const shouldSkip =
    once === 'never' || (once === 'session' && store.get(storageKey) === '1');

  const [mounted, setMounted] = useState(!shouldSkip);
  const [phase, setPhase] = useState('playing'); // playing | leaving | done
  const [useFallback, setUseFallback] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const transitionStarted = useRef(false);
  const revealed = useRef(false);

  const fireReveal = useCallback(() => {
    if (revealed.current) return;
    revealed.current = true;
    document.body.classList.remove('eg-intro-locked');
    onReveal?.();
  }, [onReveal]);

  const finish = useCallback(() => {
    setPhase('done');
    window.setTimeout(() => setMounted(false), 200);
    onDone?.();
  }, [onDone]);

  /* ---- fade the intro away and reveal the site --------------------------- */
  const endIntro = useCallback(() => {
    if (transitionStarted.current) return;
    transitionStarted.current = true;
    store.set(storageKey, '1');

    const video = videoRef.current;
    if (video) {
      video.pause();
      if (Number.isFinite(video.duration)) {
        video.currentTime = Math.min(transitionAt, Math.max(0, video.duration - 0.05));
      }
    }

    setPhase('leaving');
    fireReveal();
    window.setTimeout(finish, prefersReducedMotion() ? 300 : 620);
  }, [fireReveal, finish, storageKey, transitionAt]);

  /* ---- lifecycle -------------------------------------------------------- */
  useEffect(() => {
    if (!mounted) {
      fireReveal();
      onDone?.();
      return;
    }
    if (prefersReducedMotion()) {
      // No film for anyone who asked for stillness. Straight to the site.
      fireReveal();
      setMounted(false);
      onDone?.();
      return;
    }
    document.body.classList.add('eg-intro-locked');
    return () => document.body.classList.remove('eg-intro-locked');
  }, [mounted, fireReveal, onDone]);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') endIntro();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mounted, endIntro]);

  /* Start playback; drop to the CSS version if autoplay is refused. */
  useEffect(() => {
    if (!mounted || useFallback) return;
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = playbackRate;
    const attempt = video.play();
    if (attempt?.catch) attempt.catch(() => setUseFallback(true));

    // If nothing has painted after 2.5s, assume the file isn't coming.
    const guard = window.setTimeout(() => {
      if (video.currentTime < 0.05) setUseFallback(true);
    }, 2500);
    return () => window.clearTimeout(guard);
  }, [mounted, useFallback, playbackRate]);

  /* Fallback runs on a timer instead of a media clock. */
  useEffect(() => {
    if (!mounted || !useFallback) return;
    const t = window.setTimeout(endIntro, FALLBACK_RUNTIME);
    return () => window.clearTimeout(t);
  }, [mounted, useFallback, endIntro]);

  if (!mounted) return null;

  const handleTimeUpdate = (e) => {
    const v = e.currentTarget;
    setProgress(Math.min(1, v.currentTime / transitionAt));
    if (v.currentTime >= transitionAt) endIntro();
  };

  return (
    <div
      className="eg-intro"
      data-phase={phase}
      role="presentation"
    >
      <div className="eg-intro__plane">
        {useFallback ? (
          <CssHandshake logoMark={logoMark} logoFull={logoFull} />
        ) : (
          <video
            ref={videoRef}
            className="eg-intro__video"
            poster={poster}
            muted
            playsInline
            autoPlay
            preload="auto"
            crossOrigin="anonymous"
            onTimeUpdate={handleTimeUpdate}
            onEnded={endIntro}
            /* React listens for `error` in the capture phase at the root, so a
               <source> that the browser merely SKIPS (the mobile file, whose
               media query doesn't match on desktop) also lands here. Only treat
               a failure of the <video> itself as a real failure — otherwise the
               fallback fires before the webm is ever tried. */
            onError={(e) => {
              if (e.target === videoRef.current) setUseFallback(true);
            }}
          >
            <source src={mp4Mobile} type="video/mp4" media="(max-width: 640px)" />
            <source src={webm} type="video/webm" />
            <source src={mp4} type="video/mp4" />
          </video>
        )}
        <div className="eg-intro__vignette" />
      </div>

      {phase === 'playing' && (
        <>
          <button type="button" className="eg-intro__skip" onClick={endIntro}>
            Skip intro
          </button>
          <div className="eg-intro__progress" aria-hidden="true">
            <i style={{ width: `${progress * 100}%` }} />
          </div>
        </>
      )}
    </div>
  );
}

/* --------------------------------------------------------------------------
   No-video path: the two halves of the mark fly in from opposite sides and
   lock — the same handshake, rebuilt with transforms. ~40KB instead of 1.7MB.
   -------------------------------------------------------------------------- */
function CssHandshake({ logoMark, logoFull }) {
  return (
    <div className="eg-fallback">
      <div className="eg-fallback__mark" style={{ '--eg-mark-src': `url(${logoMark})` }}>
        <span className="eg-fallback__half eg-fallback__half--l" />
        <span className="eg-fallback__half eg-fallback__half--r" />
        <span className="eg-fallback__flash" />
      </div>
      <div className="eg-fallback__word">
        <img width="1330" height="328" src={logoFull} alt="EmpowerED Careers" />
        <span className="eg-fallback__sheen" />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Wrap the app in this so the page arrives out of depth as the intro exits.
   -------------------------------------------------------------------------- */
export function SiteStage({ state, children }) {
  const [phase, setPhase] = useState(state === 'ready' ? 'ready' : 'waiting');

  useEffect(() => {
    if (state !== 'entering') {
      setPhase(state);
      return;
    }
    setPhase('entering');
    const t = window.setTimeout(() => setPhase('ready'), 1000);
    return () => window.clearTimeout(t);
  }, [state]);

  return (
    <div className="eg-site" data-state={phase}>
      <div className="eg-site__inner">{children}</div>
    </div>
  );
}
