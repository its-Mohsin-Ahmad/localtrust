"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Role = "customer" | "provider";

export default function CreateAccountPage() {
  const supabase = useSupabase();
  const router = useRouter();

  const [role, setRole] = useState<Role>("customer");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role, phone } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // With email confirmation ON (Supabase default) there is no session yet,
    // so we cannot insert the profile row now (RLS requires auth.uid() = id).
    // The profile is created on first sign-in instead (see sign-in page).
    if (data.session) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user!.id,
        email,
        full_name: fullName,
        phone,
        role,
      });

      if (profileError && profileError.code !== "23505") {
        setError(profileError.message);
        setLoading(false);
        return;
      }

      // For providers, create an empty provider profile too
      if (role === "provider") {
        await supabase
          .from("provider_profiles")
          .insert({ id: data.user!.id, business_name: fullName });
      }
    }

    // Email confirmation required? Tell the user to check their inbox.
    const needsConfirm = Boolean(data.user && !data.session);
    router.push(
      needsConfirm ? "/sign-in?registered=1&confirm=1" : "/sign-in?registered=1"
    );
  }

  const roles: { value: Role; label: string; description: string }[] = [
    {
      value: "customer",
      label: "Customer",
      description: "I need to hire trusted professionals",
    },
    {
      value: "provider",
      label: "Service Provider",
      description: "I want to offer my services and earn",
    },
  ];

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#082B60]">
          Create your account
        </CardTitle>
        <CardDescription>
          Join LocalTrust and connect with your local community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div
              role="alert"
              className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}


          {/* Role selector */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium text-[#182230]">
              I am a…
            </legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={cn(
                    "rounded-card border p-4 text-left transition-all",
                    role === r.value
                      ? "border-[#082B60] bg-[#F0F4FF] ring-2 ring-[#082B60]/20"
                      : "border-[#E4E7EC] bg-white hover:border-[#667085]"
                  )}
                  aria-pressed={role === r.value}
                >
                  <span className="block font-semibold text-[#182230]">
                    {r.label}
                  </span>
                  <span className="mt-1 block text-xs text-[#667085]">
                    {r.description}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>


          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-[#182230]">
              Full name
            </label>
            <Input
              id="fullName"
              placeholder="e.g. Ali Khan"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#182230]">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-[#182230]">
                Phone
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="03XX-XXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                autoComplete="tel"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-[#182230]">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#182230]">
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          {role === "provider" && (
            <p className="rounded-md bg-[#FFF7ED] px-4 py-3 text-xs text-[#9A3412]">
              A one-time registration fee applies for provider accounts. You&apos;ll
              complete payment after creating your account.
            </p>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </Button>

          <p className="text-center text-sm text-[#667085]">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-[#FF6900] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

