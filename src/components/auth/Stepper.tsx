"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface StepperStep {
  key: string;
  label: string;
}

/**
 * Four-step progress indicator (spec §5.2 / §6 / §7).
 * Active step: dark navy circle, white number, navy label.
 * Inactive steps: pale-blue circle, blue-grey border, muted label.
 * Thin connecting lines between steps.
 */
export interface StepperProps {
  steps: StepperStep[];
  current: number; // 1-based active step
  className?: string;
}

export function Stepper({ steps, current = 1, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === current;
          const isCompleted = stepNumber < current;
          const last = index < steps.length - 1;
          return (
            <React.Fragment key={step.key}>
              <div
                className={cn(
                  "flex flex-col items-center relative z-10 shrink-0",
                  isActive
                    ? "text-[#061B40]"
                    : "text-[#52688D]"
                )}
              >
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm border transition-all",
                  isActive
                    ? "bg-[#061B40] border-[#061B40] text-white"
                    : isCompleted
                      ? "bg-[#EDF5FF] border-[#082B60]/30 text-[#082B60]"
                      : "bg-[#EDF5FF] border-[#D8E2EF] text-[#52688D]"
                )}>
                  {isCompleted ? (
                    <span className="text-[#15965A]">✓</span>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium leading-none text-center max-w-[80px]",
                    isActive ? "font-semibold text-[#061B40]" : "text-[#52688D]"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {last && (
                <div
                  className={cn(
                    "flex-1 h-[1px] -mt-8 self-center",
                    isActive || isCompleted ? "bg-[#082B60]" : "bg-[#D8E2EF]"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Back / Continue step navigation.
 */
export interface StepNavProps {
  onBack?: () => void;
  onContinue: () => void;
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  hideBack?: boolean;
}

export function StepNav({
  onBack,
  onContinue,
  label = "Next Step",
  loading = false,
  disabled = false,
  hideBack = false,
}: StepNavProps) {
  return (
    <div className="flex w-full justify-between gap-3 pt-6">
      {!hideBack && onBack && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={loading}
          className="w-[40%] text-[#182230] hover:bg-[#F1F3F5]"
        >
          Back
        </Button>
      )}
      <Button
        type="button"
        onClick={onContinue}
        disabled={loading || disabled}
        className={cn(
          "w-[60%] bg-[#FF6900] text-white font-medium hover:bg-[#E95B00]",
          disabled && "opacity-60"
        )}
      >
        {loading ? (
          <>
            <ArrowRight className="h-4 w-4 mr-2 animate-spin" /> {label}
          </>
        ) : (
          <>
            {label} <ArrowRight className="h-4 w-4 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
}
