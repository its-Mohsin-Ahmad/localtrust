"use client";

import * as React from "react";
import {
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  User,
  Building2,
  Briefcase,
  MapPin,
  ChevronDown,
  ShieldCheck,
  Star,
  Clock,
  Heart,
  CreditCard,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ElementType> = {
  mail: Mail,
  phone: Phone,
  lock: Lock,
  user: User,
  building: Building2,
  briefcase: Briefcase,
  mapPin: MapPin,
  shieldCheck: ShieldCheck,
  star: Star,
  clock: Clock,
  heart: Heart,
  creditCard: CreditCard,
};

/** Shared decoration props available on every field control. */
interface FieldBaseProps {
  icon?: keyof typeof ICONS;
  label?: string;
  error?: string;
  helper?: string;
  className?: string;
}

/** Native <input> flavour of {@link Field}. */
export type InputFieldProps = FieldBaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "children"> & {
    as?: "input";
  };

/** Native <select> flavour of {@link Field}. */
export type SelectFieldProps = FieldBaseProps &
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className" | "children"> & {
    as: "select";
    children?: React.ReactNode;
    /** Rendered as a disabled first option (the select has no native placeholder). */
    placeholder?: string;
  };

export type FieldProps = InputFieldProps | SelectFieldProps;

/**
 * Icon-labelled text input or select (spec §5/§6/§7 field styling).
 * White background, thin pale blue-grey border, navy icon, compact label.
 */
export function Field(props: FieldProps) {
  if (props.as === "select") {
    const { as: _as, icon, label, error, helper, className, placeholder, ...rest } =
      props as SelectFieldProps;
    return (
      <FieldFrame
        id={rest.id}
        icon={icon}
        label={label}
        error={error}
        helper={helper}
      >
        <select {...rest} className={cn(selectStyles(error), className)}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {rest.children}
        </select>
      </FieldFrame>
    );
  }

  const { as: _as, icon, label, error, helper, className, ...rest } =
    props as InputFieldProps;
  return (
    <FieldFrame id={rest.id} icon={icon} label={label} error={error} helper={helper}>
      <Input
        {...rest}
        className={cn(
          "pl-10 pr-4 h-11 text-sm border-[#D8E2EF] bg-white text-[#182230]",
          "placeholder:text-[#52688D]",
          "focus-visible:ring-2 focus-visible:ring-[#FF6900]",
          error ? "border-[#DC2626] focus-visible:ring-[#DC2626]" : "",
          className
        )}
      />
    </FieldFrame>
  );
}

function selectStyles(error?: string) {
  return (
    "pl-10 pr-4 h-11 text-sm border-[#D8E2EF] bg-white text-[#182230] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6900] " +
    (error ? "border-[#DC2626] focus-visible:ring-[#DC2626]" : "")
  );
}

/**
 * Shared label / icon / message chrome so inputs and selects stay visually
 * identical across every registration step.
 */
function FieldFrame({
  id,
  icon,
  label,
  error,
  helper,
  children,
}: {
  id?: string;
  icon?: keyof typeof ICONS;
  label?: string;
  error?: string;
  helper?: string;
  children: React.ReactNode;
}) {
  const Icon = icon ? ICONS[icon] : null;
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-[#182230] leading-none"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#52688D] pointer-events-none z-10">
            <Icon className="h-5 w-5" />
          </div>
        )}
        {children}
      </div>
      {error && <p className="text-xs text-[#DC2626]">{error}</p>}
      {helper && !error && <p className="text-xs text-[#52688D]">{helper}</p>}
    </div>
  );
}

/**
 * Password input with working show/hide toggle (spec §4.2 / §5 / §7).
 */
export interface PasswordFieldProps {
  id: string;
  label?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}

export function PasswordField({
  id,
  label,
  error,
  value,
  onChange,
  required = true,
  autoComplete = "new-password",
}: {
  id: string;
  label?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
}) {
  const [visible, setVisible] = React.useState(false);
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-[#182230] leading-none">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#52688D] pointer-events-none">
          <Lock className="h-5 w-5" />
        </div>
        <Input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          className={cn(
            "pl-10 pr-10 h-11 text-sm border-[#D8E2EF] bg-white text-[#182230]",
            "placeholder:text-[#52688D] placeholder-sm",
            "focus-visible:ring-2 focus-visible:ring-[#FF6900]",
            error ? "border-[#DC2626] focus-visible:ring-[#DC2626]" : ""
          )}
        />
        <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52688D] hover:text-[#FF6900] p-1"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
      {error && <p className="text-xs text-[#DC2626]">{error}</p>}
    </div>
  );
}