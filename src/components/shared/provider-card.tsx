"use client";

import * as React from "react";
import { ImageAsset } from "@/components/ui/image";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

export interface ProviderCardProps {
  imageKey?: string;
  name: string;
  service: string;
  location: string;
  rating: number;
  reviewCount: number;
  verified?: boolean;
  price?: string;
  href: string;
}

export function ProviderCard({
  imageKey,
  name,
  service,
  location,
  rating,
  reviewCount,
  verified,
  price,
  href,
}: ProviderCardProps) {
  return (
    <a
      href={href}
      className="group block hover-lift max-w-[220px] w-full"
    >
      <div className="aspect-square overflow-hidden rounded-card border border-[#E4E7EC] bg-white">
        {imageKey ? (
          <ImageAsset
            asset={imageKey}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            alt={`${name} profile`}
          />
        ) : (
          <div className="w-full h-full bg-[#F1F3F5] flex items-center justify-center text-[#667085]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>
      <div className="mt-3">
        <h3 className="font-semibold text-[#182230] text-sm">{name}</h3>
        <p className="text-[13px] text-[#667085] mt-0.5">{service}</p>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-[#182230] text-[13px] font-medium">{rating.toFixed(1)}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 text-[#FF6900]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.6-.921 1.9 0l.153.47c.322.986.987 1.635 1.78 1.889l.438.168 1.044-1.01c.34-.33.768-.453 1.17-.308l.473.17c.66.247 1.08.881 1.115 1.58l.033.82c.036.774-.138 1.52-.538 2.08l-.515.706c-.365.494-.874.758-1.35.65l-.603-.13c-.696-.157-1.378-.396-1.997-.63l-.803-.297a2 2 0 01-.526-.305c-.44-.25-.7-.696-.74-1.194l-.045-.61c-.036-.773.14-1.52.538-2.08l.515-.706c.365-.494.874-.758 1.35-.65l.603.13c.696.157 1.378.396 1.997.63l.803.297c.216.08.437.19.63.32a2 2 0 01.526.305c.44.25.7.696.74 1.194l.045.61c.036.773-.14 1.52-.538 2.08l-.515.706c-.365.494-.874.758-1.35.65l-.603-.13c-.696-.157-1.378-.396-1.997-.63l-.803-.297a2 2 0 01-.526-.305c-.44-.25-.7-.696-.74-1.194l-.045-.61c-.036-.773-.14-1.52-.538-2.08l-.515-.706c-.365-.494-.874-.758-1.35-.65l-.603-.13c-.696-.157-1.378-.396-1.997-.63l-.803-.297a2 2 0 01-.526-.305c-.44-.25-.7-.696-.74-1.194l-.045-.61c-.036-.773-.14-1.52-.538-2.08l-.515-.706c-.365-.494-.874-.758-1.35-.65l-.603-.13c-.696-.157-1.378-.396-1.997-.63l-.803-.297a2 2 0 01-.526-.305c-.44-.25-.7-.696-.74-1.194l-.045-.61c-.036-.773-.14-1.52-.538-2.08l-.515-.706c-.365-.494-.874-.758-1.35-.65l-.603-.13c-.696-.157-1.378-.396-1.997-.63l-.803-.297z" />
          </svg>
          <span className="text-[#667085] text-[13px] ml-1">({reviewCount})</span>
        </div>
        <p className="text-[13px] text-[#667085] mt-1">{location}</p>
        {verified && (
          <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-[#16A34A]/10 text-[#16A34A] text-[11px] font-semibold border border-[#16A34A]/20">
            Verified
          </span>
        )}
        {price && (
          <span className="mt-2 inline-block text-[#082B60] text-[13px] font-medium">{price}</span>
        )}
      </div>
    </a>
  );
}
