"use client";

import * as React from "react";
import { ShieldCheck, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Official Google "G" mark.
 *
 * lucide-react does not ship brand logos, so the mark is inlined here to keep
 * the social buttons visually correct (spec §4.2 / §5 / §7).
 */
function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.8Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.93l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.95H1.26v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.26a12 12 0 0 0 0 10.74l4.01-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.23 0 12 0A12 12 0 0 0 1.26 6.63l4.01 3.1C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

/**
 * Light-blue information panel (spec §4.2 / §5 / §7).
 * Navy icon on the left, bold title + supporting text on the right.
 */
export interface InfoPanelProps {
  title: string;
  description: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function InfoPanel({ title, description, icon, className }: InfoPanelProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-[#D8E2EF] bg-[#EDF5FF] p-4 text-sm",
        className
      )}
    >
      {icon ?? <ShieldCheck className="h-5 w-5 shrink-0 text-[#061B40] mt-0.5" />}
      <div className="leading-relaxed">
        <div className="font-semibold text-[#182230]">{title}</div>
        <div className="text-[#52688D] mt-0.5">{description}</div>
      </div>
    </div>
  );
}

/**
 * Registration fee notice panel (spec §5 / §7).
 */
export interface PaymentNoticeProps {
  onLearnMore?: () => void;
}

export function PaymentNotice({ onLearnMore }: PaymentNoticeProps = {}) {
  return (
    <InfoPanel
      title="One-time registration fee: Rs. 200 PKR"
      description={
        <>
          This fee is required to activate your account. It is charged once per
          registration through the configured payment provider.{" "}
          {onLearnMore ? (
            <span
              className="text-[#FF6900] font-semibold underline underline-offset-2 hover:underline cursor-pointer"
              onClick={onLearnMore}
            >
              Learn more
            </span>
          ) : null}
        </>
      }
    />
  );
}

/**
 * Security notice panel (spec §4.2).
 */
export function SecurityNotice() {
  return (
    <InfoPanel
      title="Your information is secure and protected."
      description="We never share your data with third parties."
    />
  );
}

/**
 * Benefit row for the promotional panel (spec §4.1 / §5.1 / §7.1).
 * Circular navy icon background with orange icon.
 */
export interface BenefitRowProps {
  icon: React.ReactNode;
  heading: string;
  description: string;
}

export function BenefitRow({ icon, heading, description }: BenefitRowProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex shrink-0 items-center justify-center h-9 w-9 rounded-full bg-[#082B60] text-[#FF6900]">
        {icon}
      </div>
      <div className="leading-relaxed">
        <div className="font-semibold text-[#FFFFFF] text-sm">{heading}</div>
        <div className="text-[#C9D4E5] text-sm mt-0.5">{description}</div>
      </div>
    </div>
  );
}

/**
 * Social sign-up buttons: Google + Apple (spec §4.2 / §5 / §7).
 * Only render buttons for configured OAuth providers.
 */
export interface SocialButtonProps {
  provider: "google" | "apple";
  onClick: () => void;
  disabled?: boolean;
}

export function SocialButton({ provider, onClick, disabled }: SocialButtonProps) {
  const Icon = provider === "google" ? GoogleMark : Apple;
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      onClick={onClick}
      disabled={disabled}
      className="w-full justify-center gap-2 text-sm font-medium text-[#182230] border-[#D8E2EF] hover:bg-[#F1F3F5]"
    >
      <Icon className="h-4 w-4" />
      {provider === "google" ? "Continue with Google" : "Continue with Apple"}
    </Button>
  );
}

export interface SocialButtonsProps {
  onGoogle?: () => void;
  onApple?: () => void;
  googleConfigured?: boolean;
  appleConfigured?: boolean;
}

export function SocialButtons({
  onGoogle,
  onApple,
  googleConfigured = false,
  appleConfigured = false,
}: SocialButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {googleConfigured && onGoogle ? (
        <SocialButton provider="google" onClick={onGoogle} />
      ) : (
        <SocialButton provider="google" onClick={() => {}} disabled={true} />
      )}
      {appleConfigured && onApple ? (
        <SocialButton provider="apple" onClick={onApple} />
      ) : (
        <SocialButton provider="apple" onClick={() => {}} disabled={true} />
      )}
    </div>
  );
}

/**
 * "Or continue with" divider.
 */
export function Divider({ label = "Or continue with" }: { label?: string }) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#D8E2EF]" />
      </div>
      <div className="relative flex justify-center text-xs uppercase tracking-wider text-[#52688D] bg-white px-4">
        {label}
      </div>
    </div>
  );
}

/**
 * Segmented Sign In / Create Account control (spec §4.2).
 */
export interface SegmentedControlProps {
  active: "signin" | "create";
  onCreate: () => void;
  onSignIn: () => void;
}

export function SegmentedControl({ active, onCreate, onSignIn }: SegmentedControlProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#D8E2EF] bg-[#EDF5FF]">
      <Button
        type="button"
        variant={active === "signin" ? "default" : "ghost"}
        onClick={onSignIn}
        className="flex-1 rounded-none py-2 text-sm font-medium border-r-transparent"
      >
        Sign In
      </Button>
      <Button
        type="button"
        variant={active === "create" ? "default" : "ghost"}
        onClick={onCreate}
        className="flex-1 rounded-none py-2 text-sm font-medium"
      >
        Create Account
      </Button>
    </div>
  );
}
