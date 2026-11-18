import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

/** Class names that define --font-plex-sans and --font-plex-arabic. Put them on <html>. */
export const fontVariables = `${plexSans.variable} ${plexArabic.variable}`;
