import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: { label: string; href: string };
  children?: React.ReactNode;
}

/**
 * Shared shell for dashboard sub-pages (bookings, messages, settings, …).
 * Renders a consistent header + optional action + content area.
 */
export function SectionPage({ title, description, icon, action, children }: SectionPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon && (
            <span className="flex items-center justify-center w-10 h-10 rounded-card bg-[#082B60]/10 text-[#082B60] shrink-0">
              {icon}
            </span>
          )}
          <div>
            <h1 className="text-[26px] font-bold text-[#182230]">{title}</h1>
            <p className="text-[#667085] text-sm">{description}</p>
          </div>
        </div>
        {action && (
          <a
            href={action.href}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-card bg-[#FF6900] text-white text-sm font-medium hover:bg-[#e55a00] transition-colors"
          >
            {action.label}
          </a>
        )}
      </div>

      {children ?? (
        <div className="bg-white border border-[#E4E7EC] rounded-card p-10 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-[#F1F3F5] flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-[#667085]" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h7M9 9h6M9 13h4" />
            </svg>
          </div>
          <h2 className="font-bold text-[#182230] text-base mb-1">{title} will appear here</h2>
          <p className="text-[#667085] text-sm max-w-md">{description} Start using LocalTrust and this section will fill up automatically.</p>
        </div>
      )}
    </div>
  );
}

export const sectionPageClass = cn("text-sm");
