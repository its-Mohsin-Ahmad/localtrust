"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({ placeholder = "What service do you need?", className }: SearchBarProps) {
  return (
    <div className={cn("relative w-full max-w-xl", className)}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]">
        <Search className="h-4 w-4" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#E4E7EC] bg-white text-[#182230] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#082B60] text-sm"
      />
    </div>
  );
}
