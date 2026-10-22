"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuthShellProps {
  children: React.ReactNode;
  promo: React.ReactNode;
  className?: string;
}

/**
 * Two-panel authentication shell (spec §3).
 *
 * Desktop: left navy promotional panel (~54%) + right white form panel (~46%).
 * Mobile: compact navy promo header above a stacked white form.
 * No navbar or footer is rendered on auth pages.
 */
export function AuthShell({ children, promo, className }: AuthShellProps) {
  return (
    <div className={cn("min-h-screen relative overflow-hidden", className)}>
      {/* Desktop: two vertical panels */}
      <div className="hidden lg:flex h-screen">
        <div className="w-0 flex-1 flex flex-col bg-deep-navy text-white p-8 lg:p-12">
          <div className="flex-shrink-0 mb-8">{promo}</div>
        </div>
        <div className="w-0 flex-1 flex flex-col justify-center bg-white p-6 lg:p-16">
          <div className="mx-auto max-w-[620px] w-full">{children}</div>
        </div>
      </div>

      {/* Mobile: promo header then stacked form */}
      <div className="lg:hidden flex flex-col min-h-[100dvh]">
        <div className="flex-shrink-0 bg-deep-navy text-white p-6 pb-4">
          {promo}
        </div>
        <div className="flex-1 overflow-y-auto bg-white p-6 pb-24">
          <div className="mx-auto max-w-[620px] w-full px-4 sm:px-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
