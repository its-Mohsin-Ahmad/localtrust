"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

const variants = {
  default: "bg-[#082B60] text-white",
  secondary: "bg-[#F1F3F5] text-[#182230]",
  destructive: "bg-[#DC2626] text-white",
  outline: "border border-[#E4E7EC] bg-white text-[#182230]",
  success: "bg-[#16A34A] text-white",
  warning: "bg-[#F59E0B] text-white",
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
