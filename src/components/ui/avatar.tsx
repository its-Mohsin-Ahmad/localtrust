"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ImageAsset } from "@/components/ui/image";

export interface AvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: "sm" | "default" | "lg";
}

const sizes = {
  sm: "h-8 w-8",
  default: "h-10 w-10",
  lg: "h-12 w-12",
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = "default", src, alt, fallback, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative flex shrink-0 overflow-hidden rounded-full", sizes[size], className)}
        {...props}
      >
        {src ? (
          <ImageAsset src={src} alt={alt ?? "User avatar"} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#F1F3F5]">
            {fallback ?? (
              <span className="text-[#667085] text-sm font-medium">?</span>
            )}
          </div>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };
