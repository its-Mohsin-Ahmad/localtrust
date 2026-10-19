import { cn } from "@/lib/utils";

/**
 * LocalTrust brand logo — orange location pin with white checkmark
 * centered inside the pin's circular opening.
 */
export function LocalTrustLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8 shrink-0", className)}
      aria-label="LocalTrust logo"
    >
      {/* Pin body — glossy orange 3D location pin */}
      <defs>
        <linearGradient id="pinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8A33" />
          <stop offset="45%" stopColor="#FF6900" />
          <stop offset="100%" stopColor="#E55A00" />
        </linearGradient>
        <linearGradient id="pinHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Pin outer shape */}
      <path
        d="M24 4 C16.2 4 9.7 10.5 9.7 18.3 C9.7 26.1 24 34 24 34 S38.3 26.1 38.3 18.3 C38.3 10.5 31.8 4 24 4 Z"
        fill="url(#pinGradient)"
        stroke="#D94A00"
        strokeWidth="1.5"
      />

      {/* Highlight sheen for 3D glossy effect */}
      <path
        d="M15.2 10.5 C13.5 11.8 12.6 14.2 12.8 16.5 L15.5 19.5 C18.2 16.8 21.5 13.2 24 11 C26.5 13.2 29.8 16.8 32.5 19.5 L35.2 16.5 C35.4 14.2 34.5 11.8 32.8 10.5 C31.1 9.2 28.9 8.5 26.4 8.5 C23.9 8.5 21.7 9.2 20 10.5"
        fill="url(#pinHighlight)"
        opacity="0.4"
      />

      {/* Circular opening near upper section */}
      <circle cx="24" cy="15" r="5.5" fill="#061B40" stroke="#FF6900" strokeWidth="2" />

      {/* White checkmark precisely centered inside the circular opening */}
      <path
        d="M21.2 15 L22.6 16.4 L26.8 12.2"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
      />
    </svg>
  );
}
