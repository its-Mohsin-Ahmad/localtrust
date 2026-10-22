"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthShell } from "@/components/auth/AuthShell";
import { PromoPanel } from "@/components/auth/PromoPanel";
import { Field, PasswordField } from "@/components/auth/FormControls";
import {
  SecurityNotice,
  SocialButtons,
  Divider,
  SegmentedControl,
} from "@/components/auth/AuthPanels";
import { ShieldCheck, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { signInSchema } from "@/lib/auth/validation";

export default function SignInPage() {
  const supabase = useSupabase();
  const router = useRouter();

  const [form, setForm] = useState<{
    emailOrMobile: string;
    password: string;
    rememberMe: boolean;
  }>({ emailOrMobile: "", password: "", rememberMe: false });
  const [mode, setMode] = useState<"signin" | "create">("signin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      signInSchema.parse({ ...form, rememberMe: form.rememberMe });
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? "Please fix the errors above.");
      return;
    }
    setLoading(true);
    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: form.emailOrMobile,
          password: form.password,
        });
      if (signInError) throw signInError;
      if (!data.user) throw new Error("No user returned from sign in.");
      let role: "customer" | "provider" | "admin" = "customer";
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();
      if (profile?.role) {
        role = profile.role;
      } else {
        const meta = (data.user.user_metadata ?? {}) as Record<string, string>;
        role =
          meta.role === "provider"
            ? "provider"
            : meta.role === "admin"
              ? "admin"
              : "customer";
        await supabase.from("profiles").insert({
          id: data.user.id,
          email: data.user.email ?? form.emailOrMobile,
          full_name: meta.full_name ?? meta.name ?? null,
          phone: meta.phone ?? null,
          role,
        });
        if (role === "provider") {
          await supabase.from("provider_profiles").insert({
            id: data.user.id,
            business_name: meta.full_name ?? null,
          });
        }
      }
      const target =
        role === "admin"
          ? "/admin"
          : role === "provider"
            ? "/provider"
            : "/customer";
      router.push(target);
      router.refresh();
    } catch (err: any) {
      setError(
        err?.message ??
          err?.error_description ??
          "Unable to sign in. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  }, [supabase, router, form.emailOrMobile, form.password]);

  return (
    <AuthShell
      promo={
        <PromoPanel
          logoVariant="light"
          headingLines={[
            { text: "Trusted Local Services," },
            { text: "Right When You Need Them.", orange: true },
          ]}
          supportingText={
            "Connect with verified professionals, compare options, and get your work done — safely, conveniently, and locally."
          }
          benefits={[
            {
              icon: <ShieldCheck className="h-5 w-5" />,
              heading: "Verified Professionals",
              description: "Work with trusted and reviewed experts.",
            },
            {
              icon: <Users className="h-5 w-5" />,
              heading: "Local Coverage",
              description: "Services across major cities in Pakistan.",
            },
            {
              icon: <Zap className="h-5 w-5" />,
              heading: "Easy Booking",
              description: "Get quotes, schedule, and track your jobs.",
            },
          ]}
          photoAsset="authSignIn"
          photoAlt="Pakistani service professional beside a white service van"
          slogan="Your Local Service Partner"
        />
      }
      className="bg-[#F8FAFC]"
    >
      <div className="flex w-full flex-col">
        {mode === "create" && (
          <div className="flex justify-end mb-4">
            <Link
              href="/auth/sign-in"
              className="text-sm text-[#FF6900] hover:underline font-medium"
            >
              Already have an account? Sign In
            </Link>
          </div>
        )}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-[32px] font-bold text-[#182230] leading-none">
            Welcome Back
          </h2>
          <Link
            href="/auth/create-account"
            className="text-sm text-[#FF6900] hover:underline font-medium"
          >
            New to INVOLVE? Create an Account
          </Link>
        </div>
        <p className="text-[#52688D] text-sm mb-6 leading-relaxed">
          Sign in to your account to continue.
        </p>
        <SegmentedControl
          active={mode}
          onCreate={() => setMode("create")}
          onSignIn={() => setMode("signin")}
        />
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div role="alert" className="rounded-lg border border-[#DC2626] bg-red-50 px-4 py-3 text-sm text-[#DC2626]">
              {error}
            </div>
          )}
          <Field
            id="emailOrMobile"
            icon="mail"
            label="Email or Mobile Number"
            placeholder="you@example.com or 03XX-XXXXXXX"
            type="email"
            autoComplete="email"
            required
            value={form.emailOrMobile}
            onChange={(e) =>
              setForm({ ...form, emailOrMobile: e.target.value })
            }
          />
          <PasswordField
            id="password"
            label="Password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
            error={error ? "Invalid email or password." : undefined}
            autoComplete="current-password"
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.rememberMe}
                onChange={(e) =>
                  setForm({ ...form, rememberMe: e.target.checked })
                }
                className="rounded border-[#D8E2EF] text-[#061B40] focus:ring-[#FF6900]"
              />
              Remember me
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-[#FF6900] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#FF6900] text-white py-4 font-medium rounded-lg hover:bg-[#E95B00] transition-colors disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
        <Divider label="Or continue with" />
        <SocialButtons
          onGoogle={() => {
            setError("Google sign-in is not configured yet.");
          }}
          onApple={() => {
            setError("Apple sign-in is not configured yet.");
          }}
        />
        <SecurityNotice />
      </div>
    </AuthShell>
  );
}
