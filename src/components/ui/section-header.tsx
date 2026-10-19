"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface SectionHeaderProps {
  title: string;
  description?: string;
  viewAll?: { label: string; href: string };
}

export function SectionHeader({
  title,
  description,
  viewAll,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h2 className="text-[32px] font-bold text-[#182230] tracking-tight mb-2">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-[#667085] text-sm">{description}</p>
        )}
      </div>
      {viewAll && (
        <Link
          href={viewAll.href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#FF6900] hover:underline"
        >
          {viewAll.label} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}

/** Alias kept for pages that import SectionHeading. */
export const SectionHeading = SectionHeader;

