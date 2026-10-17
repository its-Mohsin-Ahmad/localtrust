"use client";

import Link from "next/link";
import { ImageAsset } from "@/components/ui/image";
import { images } from "@/lib/images";

export interface CategoryCardProps {
  imageKey: string;
  title: string;
  count: string;
  icon: string;
}

const ICONS: Record<string, React.ReactNode> = {
  wrench: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  lightbulb: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.421 15.421a2 2 0 01-2.828 0 2 2 0 012.828 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15V9.364c0-.621-.22-1.213-.597-1.678l1.548-.774a2 2 0 012.828 2.828l-1.548.774A6 6 0 0012 15z" />
    </svg>
  ),
  sparkles: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M19 3v4m-2 2h4m-6 4a2 2 0 11-4 0 2 2 0 014 0zM12 21a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  ),
  snowflake: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 4v4m-4-4h4m-4 0h-4m4-4V6m0 0V2m0 2v4m0 4v4m-4-4h-4m4 0h4m-4 4V10m0 0v4m-4-4h-4m4 0h4m4-8v4m0 0v4m-4-4h-4m4 0h4m-4 4V14m0 0v4m-4-4h-4m4 0h4m4-10v4m0 0v4m-4-4h-4m4 0h4m-4 4V18m0 0v4m-4-4h-4m4 0h4m4-14v4m0 0v4m-4-4h-4m4 0h4m-4 4V22m0 0v4m-4-4h-4m4 0h4m4-18v4m0 0v4m-4-4h-4m4 0h4m-4 4V4" />
    </svg>
  ),
  hammer: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 110 4m0-4a2 2 0 100-4m6 12a2 2 0 110-4m0 4a2 2 0 100-4m-4 8a2 2 0 110-4m0 4a2 2 0 100-4m0 0v2m0-6V4m6 6v10a2 2 0 11-4 0V4m6 6v10a2 2 0 11-4 0V4m6 6v10a2 2 0 11-4 0V4" />
    </svg>
  ),
  brush: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 110 4m0-4a2 2 0 100-4m6 12a2 2 0 110-4m0 4a2 2 0 100-4m-4 8a2 2 0 110-4m0 4a2 2 0 100-4m0 0v2m0-6V4m6 6v10a2 2 0 11-4 0V4m6 6v10a2 2 0 11-4 0V4m6 6v10a2 2 0 11-4 0V4" />
    </svg>
  ),
  laptop: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-6m0 6v6m0-6H6m6 0h6m-6 0V6m0 0V0m0 6v6m0 6h6m-6 0h-6" />
    </svg>
  ),
  truck: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7a2 2 0 114 0m0 0v4a2 2 0 10-4 0V7zm4 0v4a2 2 0 10-4 0V7zm4 0v4a2 2 0 10-4 0V7zm4 0v4a2 2 0 10-4 0V7zm-4 8a2 2 0 11-4 0m4 0a2 2 0 10-4 0m4-8v4a2 2 0 10-4 0V7zm8 0v4a2 2 0 10-4 0V7zM4 7h16m0 0v9a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" />
    </svg>
  ),
};

export function CategoryCard({ imageKey, title, count, icon }: CategoryCardProps) {
  const image = images[imageKey];
  const Icon = ICONS[icon];

  return (
    <Link
      href={`/services/${title.toLowerCase().replace(/ /g, "-")}`}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden rounded-card border border-[#E4E7EC] bg-white p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
        <div className="absolute inset-0">
          <ImageAsset
            asset={imageKey}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            alt={image.alt}
          />
        </div>
        <div className="absolute top-4 left-4 z-10 p-1.5 bg-white/90 backdrop-blur rounded-full">
          <span className="text-[#082B60] group-hover:text-[#FF6900] transition-colors">{Icon}</span>
        </div>
      </div>
      <h3 className="mt-3 font-bold text-[#182230] text-sm leading-tight group-hover:text-[#FF6900] transition-colors">
        {title}
      </h3>
      <p className="mt-1 text-xs text-[#667085]">{count}</p>
    </Link>
  );
}
