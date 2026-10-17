"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", asChild = false, ...props },
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const Comp = asChild ? React.Fragment : ("button" as const);

    const variants = {
      default: "bg-[#082B60] text-white hover:bg-[#061B40]",
      destructive: "bg-[#DC2626] text-white hover:bg-[#b91c1c]",
      outline: "border border-[#E4E7EC] bg-white hover:bg-[#F1F3F5] text-[#182230]",
      secondary: "bg-[#F1F3F5] text-[#182230] hover:bg-[#E4E7EC]",
      ghost: "hover:bg-[#F1F3F5] hover:text-[#182230]",
      link: "text-[#FF6900] underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm font-medium",
      sm: "h-9 px-3 text-xs font-medium",
      lg: "h-11 px-8 py-3 text-base font-medium",
      icon: "h-10 w-10",
    };

    if (asChild) {
      return (
        <Comp
          className={cn(
            "inline-flex items-center justify-center rounded-card whitespace-nowrap transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
            variants[variant],
            sizes[size],
            className
          )}
          {...props}
        />
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-card whitespace-nowrap transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
