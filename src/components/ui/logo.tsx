import { cn } from "@/lib/utils";

/**
 * TrustLocal brand logo — vivid orange location pin with a white checkmark
 * inside, matching the reference screenshot.
 */
export function LocalTrustLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-7 w-6 shrink-0", className)}
      aria-label="TrustLocal logo"
    >
      {/* Location Pin Shape */}
      <path
        d="M18 1C8.611 1 1 8.611 1 18c0 12.5 17 23 17 23s17-10.5 17-23c0-9.389-7.611-17-17-17z"
        fill="#FF6900"
      />
      {/* Inner white checkmark */}
      <path
        d="M11 18.5L16 23.5L25 13.5"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
