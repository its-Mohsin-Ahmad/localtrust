"use client";

import * as React from "react";
import { ImageAsset } from "@/components/ui/image";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  asset?: string;
  title: string;
  description: string;
  action?: { label: string; href: string };
  icon?: React.ReactNode;
}

export function EmptyState({ asset, title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="w-24 h-24 mb-4 rounded-full bg-[#F1F3F5] flex items-center justify-center">
        {asset ? (
          <ImageAsset
            asset={asset}
            className="w-full h-full object-cover object-center"
            alt={title}
            objectPosition="center"
          />
        ) : (
          icon || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-[#667085]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h7a2 2 0 012 2v10a2 2 0 01-2 2z" />
            </svg>
          )
        )}
      </div>
      <h3 className="font-bold text-[#182230] text-lg mb-1">{title}</h3>
      <p className="text-[#667085] text-sm mb-6 max-w-xs">{description}</p>
      {action && (
        <a
          href={action.href}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#082B60] text-white rounded-md text-sm font-medium hover:bg-[#061B40] transition-colors"
        >
          {action.label} <span className="text-[#FF6900]">→</span>
        </a>
      )}
    </div>
  );
}
