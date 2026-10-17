import { cn } from "@/lib/utils";

/**
 * LocalTrust logo mark — a location pin with a checkmark shield.
 * Inherits color via `currentColor` unless className overrides it.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
    >
      <path
        d="M24 4C15.163 4 8 11.163 8 20c0 10.5 16 24 16 24s16-13.5 16-24c0-8.837-7.163-16-16-16z"
        fill="#082B60"
      />
      <path
        d="M17 20.5l5 5 9-9.5"
        stroke="#FF6900"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
