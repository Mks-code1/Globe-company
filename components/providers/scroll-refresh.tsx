"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Calls ScrollTrigger.refresh() once fonts and images have loaded, and again (debounced)
 * whenever the document height changes (lazy images, accordions, route changes).
 */
export function ScrollRefresh() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    document.fonts?.ready.then(refresh);
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });

    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", refresh);
      ro.disconnect();
    };
  }, []);

  return null;
}
