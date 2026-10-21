import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";

/**
 * INVOLVE emblem geometry.
 *
 * Three abstract human figures stand at 120 degrees around a shared centre.
 * Every figure is an oval HEAD on the outer edge plus a single flowing,
 * tapered body/arm crescent that sweeps clockwise and curls inward to a
 * sharp tip. The three tips frame a soft trefoil-ish void at the centre and
 * every neighbouring pair is separated by visible negative space, so each
 * figure still reads on its own.
 *
 * The emblem is authored in a `0 0 120 120` viewBox centred on (60, 60):
 * one figure is drawn with its head at the top and reused through two
 * 120 degree rotations.
 */
const FIGURE_BODY_PATH =
  "M 60 30 C 76.27 23.46 95.65 35.95 79.99 60.7 C 85.68 51.66 76.46 37.35 60 38 Z";

const HEAD = {
  cx: 60,
  cy: 17,
  rx: 9.2,
  ry: 11,
  rot: 18,
} as const;

const WORDMARK_FONT =
  "Inter, 'Plus Jakarta Sans', Arial, sans-serif";

let instanceSeq = 0;

function nextInstanceId(prefix: string) {
  instanceSeq += 1;
  return `${prefix}-${instanceSeq}`;
}

function sanitizeId(value: string) {
  return value.replace(/[^A-Za-z0-9_-]/g, "");
}

export type InvolveSymbolProps = {
  className?: string;
  title?: string;
  idPrefix?: string;
  decorative?: boolean;
  /** Renders the emblem as one flat, solid brand-orange silhouette. */
  flat?: boolean;
};

export type InvolveLogoProps = {
  className?: string;
  variant?: "light" | "dark";
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  idPrefix?: string;
  title?: string;
  /** Renders the emblem as one flat, solid brand-orange silhouette. */
  flat?: boolean;
};

export type InvolveLockupHorizontalProps = {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  idPrefix?: string;
  title?: string;
  /** Renders the emblem as one flat, solid brand-orange silhouette. */
  flat?: boolean;
};

const LOGO_SIZE_CLASS: Record<NonNullable<InvolveLogoProps["size"]>, string> = {
  sm: "w-[120px]",
  md: "w-[160px]",
  lg: "w-[208px]",
};

const LOCKUP_SIZE_CLASS: Record<
  NonNullable<InvolveLockupHorizontalProps["size"]>,
  string
> = {
  sm: "h-8",
  md: "h-9",
  lg: "h-10",
};

function textColorClass(variant: "light" | "dark") {
  return variant === "light" ? "text-white" : "text-deep-navy";
}

function EmblemFigure({
  gradientId,
  shadeId,
  flat,
}: {
  gradientId: string;
  shadeId: string;
  flat: boolean;
}) {
  const fill = flat ? BRAND.colors.orange : `url(#${gradientId})`;

  return (
    <g id={`${gradientId}-figure`}>
      <path d={FIGURE_BODY_PATH} fill={fill} />
      <ellipse
        cx={HEAD.cx}
        cy={HEAD.cy}
        rx={HEAD.rx}
        ry={HEAD.ry}
        transform={`rotate(${HEAD.rot} ${HEAD.cx} ${HEAD.cy})`}
        fill={fill}
      />
      {flat ? null : (
        <path d={FIGURE_BODY_PATH} fill={`url(#${shadeId})`} />
      )}
    </g>
  );
}

function EmblemDefs({
  gradientId,
  shadeId,
  flat,
}: {
  gradientId: string;
  shadeId: string;
  flat: boolean;
}) {
  if (flat) {
    return (
      <defs>
        <EmblemFigure gradientId={gradientId} shadeId={shadeId} flat />
      </defs>
    );
  }

  return (
    <defs>
      <linearGradient
        id={gradientId}
        gradientUnits="userSpaceOnUse"
        x1="60"
        y1="6"
        x2="60"
        y2="62"
      >
        <stop offset="0" stopColor={BRAND.colors.orangeGlow} />
        <stop offset="0.45" stopColor={BRAND.colors.orange} />
        <stop offset="1" stopColor={BRAND.colors.orangeShadow} />
      </linearGradient>
      <radialGradient
        id={shadeId}
        gradientUnits="userSpaceOnUse"
        cx="60"
        cy="15"
        r="54"
      >
        <stop
          offset="0.25"
          stopColor={BRAND.colors.orangeShadow}
          stopOpacity={0}
        />
        <stop
          offset="1"
          stopColor={BRAND.colors.orangeShadow}
          stopOpacity={0.45}
        />
      </radialGradient>
      <EmblemFigure gradientId={gradientId} shadeId={shadeId} flat={false} />
    </defs>
  );
}

/**
 * The INVOLVE emblem on its own.
 *
 * Rendered as inline SVG (not an <img>) so it can be recoloured, animated or
 * themed by the surrounding page. Pass `flat` for a single solid-colour
 * silhouette that stays crisp on small surfaces.
 */
export function InvolveSymbol({
  className,
  title,
  idPrefix,
  decorative = false,
  flat = false,
}: InvolveSymbolProps) {
  const base = idPrefix
    ? sanitizeId(idPrefix)
    : nextInstanceId("involve-symbol");
  const gradientId = base + "-grad";
  const shadeId = base + "-shade";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      className={cn("h-8 w-8 shrink-0", className)}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : (title ?? BRAND.name)}
      focusable="false"
    >
      {decorative ? null : <title>{title ?? BRAND.name}</title>}
      <EmblemDefs gradientId={gradientId} shadeId={shadeId} flat={flat} />
      <use href={`#${gradientId}-figure`} />
      <use href={`#${gradientId}-figure`} transform="rotate(120 60 60)" />
      <use href={`#${gradientId}-figure`} transform="rotate(240 60 60)" />
    </svg>
  );
}

/**
 * The flat, single-colour INVOLVE emblem (solid brand orange).
 *
 * Used on the navbar and footer where a gradient would only add noise.
 */
export function InvolveSymbolFlat(
  props: Omit<InvolveSymbolProps, "flat">
) {
  return <InvolveSymbol {...props} flat />;
}

/**
 * The full INVOLVE lockup: emblem stacked above the wordmark.
 *
 * `variant="light"` renders the wordmark in white for dark navy surfaces,
 * `variant="dark"` renders it in navy for light surfaces.
 */
export function InvolveLogo({
  className,
  variant = "light",
  showWordmark = true,
  size = "md",
  idPrefix,
  title,
  flat = false,
}: InvolveLogoProps) {
  const base = idPrefix
    ? sanitizeId(idPrefix)
    : nextInstanceId("involve-logo");
  const gradientId = base + "-grad";
  const shadeId = base + "-shade";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={showWordmark ? "0 0 240 214" : "60 0 120 120"}
      className={cn(
        "h-auto shrink-0",
        LOGO_SIZE_CLASS[size],
        textColorClass(variant),
        className
      )}
      role="img"
      aria-label={title ?? BRAND.name}
      focusable="false"
    >
      <title>{title ?? BRAND.name}</title>
      <EmblemDefs gradientId={gradientId} shadeId={shadeId} flat={flat} />
      <g transform={showWordmark ? "translate(60 0)" : undefined}>
        <use href={`#${gradientId}-figure`} />
        <use href={`#${gradientId}-figure`} transform="rotate(120 60 60)" />
        <use href={`#${gradientId}-figure`} transform="rotate(240 60 60)" />
      </g>
      {showWordmark ? (
        <text
          x="120"
          y="188"
          textAnchor="middle"
          textLength={206}
          lengthAdjust="spacingAndGlyphs"
          fontFamily={WORDMARK_FONT}
          fontSize={54}
          fontWeight={800}
          letterSpacing={1.5}
          fill="currentColor"
        >
          <tspan>IN</tspan>
          <tspan fill={BRAND.colors.orange}>V</tspan>
          <tspan>OLVE</tspan>
        </text>
      ) : null}
    </svg>
  );
}

/**
 * Compact horizontal lockup for the navbar: emblem beside the wordmark.
 *
 * The emblem renders around 30-38px and the wordmark around 19-24px,
 * depending on the requested size.
 */
export function InvolveLockupHorizontal({
  className,
  variant = "light",
  size = "md",
  idPrefix,
  title,
  flat = false,
}: InvolveLockupHorizontalProps) {
  const base = idPrefix
    ? sanitizeId(idPrefix)
    : nextInstanceId("involve-lockup");
  const gradientId = base + "-grad";
  const shadeId = base + "-shade";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 214 52"
      className={cn(
        "w-auto shrink-0",
        LOCKUP_SIZE_CLASS[size],
        textColorClass(variant),
        className
      )}
      role="img"
      aria-label={title ?? BRAND.name}
      focusable="false"
    >
      <title>{title ?? BRAND.name}</title>
      <EmblemDefs gradientId={gradientId} shadeId={shadeId} flat={flat} />
      <g transform="scale(0.5)">
        <use href={`#${gradientId}-figure`} />
        <use href={`#${gradientId}-figure`} transform="rotate(120 60 60)" />
        <use href={`#${gradientId}-figure`} transform="rotate(240 60 60)" />
      </g>
      <text
        x="60"
        y="37"
        textLength={150}
        lengthAdjust="spacingAndGlyphs"
        fontFamily={WORDMARK_FONT}
        fontSize={31}
        fontWeight={800}
        letterSpacing={1.2}
        fill="currentColor"
      >
        <tspan>IN</tspan>
        <tspan fill={BRAND.colors.orange}>V</tspan>
        <tspan>OLVE</tspan>
      </text>
    </svg>
  );
}