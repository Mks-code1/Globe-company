import Image, { type ImageProps } from "next/image";

/** Alt texts that are known copy-paste leftovers from the old site. */
const BANNED_ALT = new Set(["kidana"]);

type ImgProps = Omit<ImageProps, "alt"> & {
  /**
   * Meaningful alt text, taken from data. Required.
   * Pass `decorative` (and alt="") only for purely decorative images.
   */
  alt: string;
  decorative?: boolean;
};

/**
 * next/image wrapper that refuses missing, empty or known-bad alt text.
 * In development it throws; in production it logs and renders the image as decorative
 * rather than shipping a wrong description.
 */
export function Img({ alt, decorative = false, ...props }: ImgProps) {
  const trimmed = alt.trim();
  const bad = !decorative && (trimmed === "" || BANNED_ALT.has(trimmed.toLowerCase()));

  if (bad) {
    const message = `<Img> needs meaningful alt text (got "${alt}") for src=${String(props.src)}`;
    if (process.env.NODE_ENV !== "production") throw new Error(message);
    console.error(message);
  }

  return <Image {...props} alt={decorative || bad ? "" : trimmed} />;
}
