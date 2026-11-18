"use client";

import type { ReactNode } from "react";
import { MotionProvider } from "./motion-provider";
import { ScrollRefresh } from "./scroll-refresh";
import { SmoothScroll } from "./smooth-scroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <SmoothScroll>
        <ScrollRefresh />
        {children}
      </SmoothScroll>
    </MotionProvider>
  );
}
