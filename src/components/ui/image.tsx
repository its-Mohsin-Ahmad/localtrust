"use client";

import * as React from "react";
import Image from "next/image";
import { getImage } from "@/lib/images";
import { cn } from "@/lib/utils";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  asset?: string;
  fallback?: string;
  className?: string;
  priority?: boolean;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
}

export function ImageAsset({
  asset,
  src,
  fallback,
  className,
  priority = false,
  width,
  height,
  ...props
}: ImageProps) {
  const resolved = asset ? getImage(asset) : undefined;
  const finalSrc = src ?? resolved?.src ?? fallback;
  const finalAlt = props.alt ?? resolved?.alt ?? "Image";

  return (
    <Image
      src={finalSrc as string}
      alt={finalAlt}
      width={Number(resolved?.width ?? width ?? 0) || undefined}
      height={Number(resolved?.height ?? height ?? 0) || undefined}
      priority={priority}
      className={cn("block", className)}
      {...(asset ? { sizes: "(max-width: 768px) 100vw, 50vw" } : {})}
      {...props}
    />
  );
}
