/**
 * GSAP entry point. Import gsap, ScrollTrigger, SplitText, Flip and useGSAP from HERE only,
 * so plugins are registered exactly once and only in the browser.
 * (Client-only module: import it from "use client" components.)
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { MQ } from "./motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip);
}

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };

type MQKey = keyof typeof MQ;
type MQHandler = (context: gsap.Context) => void | (() => void);

/**
 * Runs animation code inside gsap.matchMedia() using the MQ constants from lib/motion.ts.
 * Usage (always inside useGSAP, with a scope ref):
 *
 *   useGSAP(() => {
 *     const mm = matchMedia({ motionOK: () => { ...create tweens / ScrollTriggers... } }, ref.current);
 *     return () => mm.revert();
 *   }, { scope: ref });
 *
 * Combine conditions by nesting keys, e.g. `{ motionOK: ..., desktop: ... }` run independently;
 * for "desktop AND fine AND motionOK" use `matchMediaAll(["desktop","fine","motionOK"], fn, scope)`.
 */
export function matchMedia(
  handlers: Partial<Record<MQKey, MQHandler>>,
  scope?: Element | string | null,
): gsap.MatchMedia {
  const mm = gsap.matchMedia(scope ?? undefined);
  (Object.keys(handlers) as MQKey[]).forEach((key) => {
    const handler = handlers[key];
    if (handler) mm.add(MQ[key], (ctx) => handler(ctx as unknown as gsap.Context));
  });
  return mm;
}

/** One handler that only runs while ALL listed media queries match. */
export function matchMediaAll(
  keys: MQKey[],
  handler: MQHandler,
  scope?: Element | string | null,
): gsap.MatchMedia {
  const mm = gsap.matchMedia(scope ?? undefined);
  mm.add(keys.map((k) => MQ[k]).join(" and "), (ctx) => handler(ctx as unknown as gsap.Context));
  return mm;
}

/**
 * Call once a reveal (or any entrance animation) has actually started.
 * The inline head script's failsafe checks this attribute: if it is still missing after
 * RULES.failsafeMs, it removes html[data-motion] so [data-reveal] content becomes visible.
 */
export function markMotionRan() {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-motion-ran", "");
  }
}
