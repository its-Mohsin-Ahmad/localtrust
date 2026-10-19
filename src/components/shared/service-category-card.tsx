"use client";

import * as React from "react";
import { ImageAsset } from "@/components/ui/image";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

export interface CategoryCardProps {
  imageKey: string;
  title: string;
  count?: string;
  href: string;
}

export function CategoryCard({ imageKey, title, count, href }: CategoryCardProps) {
  const image = images[imageKey];

  return (
    <a
      href={href}
      className="group block hover-lift"
    >
      <div className="relative aspect-square overflow-hidden rounded-card border border-[#E4E7EC] bg-white p-3 max-w-[200px] w-full">
        <div className="absolute inset-0">
          <ImageAsset
            asset={imageKey}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            alt={image.alt}
            objectPosition="center"
          />
        </div>
        <div className="absolute top-3 left-3 z-10 p-1 bg-white/90 backdrop-blur rounded-full shadow-sm">
          <span className="text-[#082B60] group-hover:text-[#FF6900] transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
        </div>
      </div>
      <h3 className="mt-2.5 font-semibold text-[#182230] text-sm leading-tight group-hover:text-[#FF6900] transition-colors">
        {title}
      </h3>
      {count && (
        <p className="mt-1 text-[13px] text-[#667085]">{count}</p>
      )}
    </a>
  );
}
