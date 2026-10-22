"use client";

import * as React from "react";
import { InvolveLockupHorizontal } from "@/components/brand/involve-logo";
import { ImageAsset } from "@/components/ui/image";
import { BenefitRow } from "./AuthPanels";
import { cn } from "@/lib/utils";

export interface PromoPanelProps {
  /** Logo variant: "light" (white wordmark + orange V on navy). */
  logoVariant?: "light";
  /** Eyebrow label above the heading. */
  eyebrow?: string;
  /** Main heading parts: [{text, orange?}] */
  headingLines: Array<{ text: string; orange?: boolean }>;
  supportingText: string;
  /** 2-4 benefit rows. */
  benefits: Array<{
    icon: React.ReactNode;
    heading: string;
    description: string;
  }>;
  /** Image asset key from @/lib/images for the right side of the left panel. */
  photoAsset?: string;
  photoAlt?: string;
  /** Bottom handwritten-style slogan. */
  slogan: string;
  /** Optional top-right account link (rendered inside promo on mobile). */
  topRight?: React.ReactNode;
  className?: string;
}

/**
 * Left navy promotional panel shared across auth pages (spec §3, §4.1, §5.1, §7.1).
 */
export function PromoPanel({
  logoVariant = "light",
  eyebrow,
  headingLines,
  supportingText,
  benefits,
  photoAsset,
  photoAlt,
  slogan,
  topRight,
  className,
}: PromoPanelProps) {
  return (
    <div className={cn("flex flex-col h-full gap-8", className)}>
      <div className="flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <InvolveLockupHorizontal variant={logoVariant} size="sm" idPrefix="involve-auth-promo" flat />
        </div>
        {topRight}
        {eyebrow && (
          <p className="text-xs uppercase tracking-wider text-[#C9D4E5] mb-3 font-medium">
            {eyebrow}
          </p>
        )}
        <div className="space-y-2">
          {headingLines.map((line, i) => (
            <h2
              key={i}
              className={cn(
                "text-[32px] font-bold leading-[1.05] tracking-tight",
                line.orange ? "text-[#FF6900]" : "text-[#FFFFFF]"
              )}
            >
              {line.text}
            </h2>
          ))}
        </div>
        <p className="text-[#C9D4E5] text-sm leading-relaxed max-w-xs mt-3">
          {supportingText}
        </p>
      </div>

      {/* Benefits */}
      <div className="space-y-3">
        {benefits.map((b, i) => (
          <BenefitRow key={i} {...b} />
        ))}
      </div>

      {/* Photo: right portion of the left panel */}
      {photoAsset && (
        <div className="mt-auto flex items-end">
          <ImageAsset
            asset={photoAsset}
            alt={photoAlt ?? "Service professional"}
            className="object-cover w-full h-64 md:h-80 lg:h-full rounded-lg"
            objectPosition="center"
            priority
          />
        </div>
      )}

      {/* Bottom slogan */}
      <div className="mt-auto flex items-end gap-2">
        <p className="text-[#FFFFFF] text-[18px] font-semibold italic leading-none">{slogan}</p>
        <div className="h-0.5 w-16 bg-[#FF6900] rounded-full" />
      </div>
    </div>
  );
}
