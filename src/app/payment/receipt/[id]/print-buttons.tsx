"use client";

import { Download, Printer } from "lucide-react";

export function PrintButtons() {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-card border border-[#E4E7EC] text-sm font-medium text-[#182230] hover:bg-[#F1F3F5] transition-colors"
      >
        <Printer className="w-4 h-4" /> Print
      </button>
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-card bg-[#FF6900] text-white text-sm font-medium hover:bg-[#e55a00] transition-colors"
      >
        <Download className="w-4 h-4" /> Download
      </button>
    </div>
  );
}