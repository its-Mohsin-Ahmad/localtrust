/**
 * Centralised INVOLVE brand configuration.
 *
 * Every colour, name and copy string used across the product should come from
 * here so the INVOLVE branding stays consistent across the product.
 */

export const BRAND = {
  name: "INVOLVE",
  nameTitleCase: "Involve",
  tagline: "Together for a Better Tomorrow",
  colors: {
    navy: "#061B40",
    navySecondary: "#082B60",
    navyDeep: "#04132F",
    orange: "#FF6900",
    orangeHighlight: "#FF8500",
    orangeGlow: "#FF8A00",
    orangeShadow: "#D94D00",
    white: "#FFFFFF",
    muted: "#C9D4E5",
    lightBg: "#F2F5F8",
    success: "#15965A",
  },
  documentTitle: "INVOLVE — Find Trusted Local Professionals",
  description:
    "Discover local services, compare professionals, and request appointments with INVOLVE.",
} as const;

export type BrandColors = typeof BRAND.colors;

/**
 * Prefixes a root-relative asset path with the deployment base path.
 *
 * The GitHub Pages workflow builds the site with `basePath=/localtrust`, but
 * files served straight out of `public/` are *not* rewritten by Next.js, so a
 * raw `/brand/involve-symbol.svg` reference 404s on the deployed site.
 *
 * Absolute URLs, protocol-relative URLs and `data:`/`blob:` URIs are returned
 * untouched, as are paths that already carry the base path.
 */
export function withBrandPath(src: string): string {
  if (!src) return src;
  if (!src.startsWith("/")) return src;
  if (src.startsWith("//")) return src;
  if (/^(data|blob):/i.test(src)) return src;

  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
  if (!basePath) return src;
  if (src === basePath || src.startsWith(`${basePath}/`)) return src;

  return `${basePath}${src}`;
}