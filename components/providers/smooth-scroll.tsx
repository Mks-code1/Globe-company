"use client";

import { ReactLenis, useLenis } from "lenis/react";
import type Lenis from "lenis";
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MQ } from "@/lib/motion";

type SmoothScrollApi = {
  /** Pause scrolling (menu / lightbox open). No-op when smooth scroll is disabled. */
  stop: () => void;
  /** Resume scrolling. */
  start: () => void;
};

const noop = () => {};
const SmoothScrollContext = createContext<SmoothScrollApi>({ stop: noop, start: noop });

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/** Connects the Lenis instance to the GSAP ticker and ScrollTrigger. */
function LenisBridge({ instanceRef }: { instanceRef: { current: Lenis | null } }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    instanceRef.current = lenis;

    const onTick = (time: number) => lenis.raf(time * 1000); // gsap time is seconds
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(onTick);
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP's default
      instanceRef.current = null;
    };
  }, [lenis, instanceRef]);

  return null;
}

/**
 * Lenis smooth scrolling, driven by gsap.ticker.
 * - Disabled entirely when prefers-reduced-motion is set (no Lenis instance is created).
 * - Touch devices keep native scrolling (Lenis' syncTouch defaults to false).
 * - Children are never remounted when the setting toggles.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const instanceRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(MQ.motionOK);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const api = useMemo<SmoothScrollApi>(
    () => ({
      stop: () => instanceRef.current?.stop(),
      start: () => instanceRef.current?.start(),
    }),
    [],
  );

  return (
    <SmoothScrollContext.Provider value={api}>
      {/* Rendered as a childless sibling so toggling it never remounts the page. */}
      {enabled && <ReactLenis root options={{ autoRaf: false, syncTouch: false }} />}
      {enabled && <LenisBridge instanceRef={instanceRef} />}
      {children}
    </SmoothScrollContext.Provider>
  );
}
