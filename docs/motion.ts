/**
 * Globe — motion constants. Copy to lib/motion.ts.
 * Single source of truth for every animation: GSAP (seconds), Motion (seconds),
 * and the media queries that gate them. Values here must match the CSS durations in tokens.css.
 * Do not hardcode easings, durations, distances or breakpoints anywhere else.
 */

/** Cubic-béziers for Motion (`transition={{ ease: EASE.expo }}`) and CSS. */
export const EASE = {
  expo: [0.16, 1, 0.3, 1] as const,      // hero, reveals, panels (the signature easing)
  standard: [0.2, 0, 0, 1] as const,     // small UI state changes
  inOut: [0.65, 0, 0.35, 1] as const,    // pins, crossfades, wipes
};

/** GSAP equivalents. */
export const GSAP_EASE = {
  expo: "expo.out",
  standard: "power2.out",
  inOut: "power3.inOut",
};

/** Seconds. */
export const DURATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.45,
  reveal: 0.9,      // text line reveals
  image: 1.1,       // clip-path image wipes
  hero: 2,          // hero media settle (scale 1.12 → 1)
  page: 0.6,        // route enter
};

/** Seconds between sibling items. */
export const STAGGER = {
  lines: 0.09,
  words: 0.04,      // used for Arabic instead of lines/chars
  cards: 0.08,
  menu: 0.05,
};

/** Distances. Pixels unless noted. */
export const DISTANCE = {
  reveal: 32,           // fade-up travel
  nudge: 8,             // hover shift toward inline-end
  parallaxPercent: 8,   // max yPercent for Parallax
  heroDriftPercent: 15, // hero media drift on scroll-out
  imageScaleFrom: 1.15, // inner image scale during a clip-path reveal
  heroScaleFrom: 1.12,
};

/** ScrollTrigger defaults. */
export const SCROLL = {
  enter: "top 85%",
  enterText: "top 80%",
  scrub: 0.6,           // seconds of smoothing on scrubbed animations
};

/** Media queries: every animation is created inside gsap.matchMedia() with one of these. */
export const MQ = {
  motionOK: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  fine: "(hover: hover) and (pointer: fine)",   // magnetic buttons, custom cursor, hover effects
  desktop: "(min-width: 1024px)",                // pinned and horizontal scroll sections
};

/** Hard rules enforced in code review. */
export const RULES = {
  animateOnly: ["transform", "opacity", "clip-path"] as const, // never animate layout properties (except Motion `layout`)
  splitArabicBy: ["words", "lines"] as const,                  // NEVER by characters: it breaks Arabic joining
  failsafeMs: 4000,                                            // remove html[data-motion] if the first reveal never ran
};
