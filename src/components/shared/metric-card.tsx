"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface MetricCardProps {
  label: string;
  value: string | number;
  change?: { value: string; positive: boolean };
  icon: React.ReactNode;
}

export function MetricCard({ label, value, change, icon }: MetricCardProps) {
  return (
    <div className="flex flex-col gap-2 bg-white border border-[#E4E7EC] rounded-card p-4">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-[#F1F3F5] text-[#082B60]">{icon}</div>
        {change && (
          <Badge
            variant={change.positive ? "success" : "destructive"}
            className="text-[11px] px-2 py-1"
          >
            {change.positive ? "↑" : "↓"} {change.value}
          </Badge>
        )}
      </div>
      <p className="text-[13px] text-[#667085] font-medium">{label}</p>
      <p className="text-lg font-bold text-[#182230]">{value}</p>
    </div>
  );
}
