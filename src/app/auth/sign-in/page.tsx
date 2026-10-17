"use client";

import { useState, useEffect } from "react";
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

export default function SignInPage() {
  const supabase = useSupabase();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Registration success / email-confirmation notices from the query string
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("registered") === "1") {
      setNotice(
        params.get("confirm") === "1"
          ? "Account created. Check your email to confirm your address, then sign in."
          : "Account created successfully — you can sign in now."
      );
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // Redirect based on role stored in profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    let role = profile?.role;

    // First login (profile not created yet — e.g. email confirmation was
    // required at signup, so the insert happened without a session).
    // Create it now from the metadata captured at signup.
    if (!profile) {
      const meta = (data.user.user_metadata ?? {}) as Record<string, string>;
      role = meta.role === "provider" ? "provider" : "customer";

      const { error: insertError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email: data.user.email ?? email,
        full_name: meta.full_name ?? meta.name ?? null,
        phone: meta.phone ?? null,
        role,
      });

      if (insertError && insertError.code !== "23505") {
        setError("Your account exists but its profile could not be loaded.");
        setLoading(false);
        return;
      }

      if (role === "provider") {
        await supabase
          .from("provider_profiles")
          .insert({ id: data.user.id, business_name: meta.full_name ?? null });
      }
    }

    const target =
      role === "admin" ? "/admin" : role === "provider" ? "/provider" : "/customer";
    router.push(target);
    router.refresh();
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#082B60]">
          Welcome back
        </CardTitle>
        <CardDescription>
          Sign in to your LocalTrust account to manage bookings and services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {notice && (
            <div
              role="status"
              className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-800"
            >
              {notice}
            </div>
          )}
          {error && (
            <div
              role="alert"
              className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#182230]"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#182230]"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>

          <p className="text-center text-sm text-[#667085]">
            Don&apos;t have an account?{" "}
            <Link
              href="/create-account"
              className="font-medium text-[#FF6900] hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
