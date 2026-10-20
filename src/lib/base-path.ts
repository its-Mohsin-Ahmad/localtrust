/**
 * Resolves asset URLs that live in `public/`.
 *
 * The GitHub Pages deployment builds the site with `basePath`/`assetPrefix`
 * set to `/localtrust`. Next.js does not prefix `public/` files for
 * `next/image` when the image optimizer is disabled (static export), so every
 * raw `/images/...` path would 404 on the deployed site. Prefixing the path
 * here keeps local images working in both dev and the static export.
 */

const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

export function withBasePath(src: string): string {
  if (!src) return src;
  if (!src.startsWith("/")) return src;
  if (src.startsWith("//")) return src;
  if (!BASE_PATH) return src;
  return `${BASE_PATH}${src}`;
}
