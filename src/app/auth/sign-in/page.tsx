"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageAsset } from "@/components/ui/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LocalTrustLogo } from "@/components/ui/logo";

export default function SignInPage() {
  const supabase = useSupabase();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    let role = profile?.role;

    if (!profile) {
      const meta = (data.user.user_metadata ?? {}) as Record<string, string>;
      role = meta.role === "provider" ? "provider" : "customer";
      await supabase.from("profiles").insert({
        id: data.user.id,
        email: data.user.email ?? email,
        full_name: meta.full_name ?? meta.name ?? null,
        phone: meta.phone ?? null,
        role,
      });
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
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-center p-8 lg:p-12 bg-[#082B60] text-white">
        <div className="flex items-center gap-2 mb-12">
          <LocalTrustLogo className="h-8 w-8" />
          <span className="font-extrabold text-[#FF6900] tracking-tight text-[20px]">LocalTrust</span>
        </div>
        <ImageAsset
          asset="aboutProfessionals"
          className="w-full h-64 object-cover rounded-lg mb-8"
          alt="Professional service provider"
          objectPosition="center"
        />
        <h2 className="text-[32px] font-bold leading-tight mb-4">Welcome Back</h2>
        <p className="text-[#E4E7EC] text-lg leading-relaxed max-w-md">
          Your local services are just a few steps away. Sign in to manage your bookings and connect with trusted professionals.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <Card className="w-full max-w-md">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-[#182230]">Sign in to LocalTrust</CardTitle>
            <CardDescription>Enter your email and password to access your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[#182230]">Email</label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#182230]">Password</label>
                <Input id="password" type="password" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#182230] cursor-pointer">
                  <input type="checkbox" className="rounded border-[#E4E7EC] text-[#082B60] focus:ring-[#FF6900]" /> Remember me
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-[#FF6900] hover:underline">Forgot password?</Link>
              </div>
              <Button type="submit" className="w-full bg-[#FF6900] text-white py-3 rounded-card font-medium hover:bg-[#e55a00] transition-colors" disabled={loading}>
                {loading ? "Signing in\u2026" : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <div className="border-t border-[#E4E7EC] pt-6">
            <p className="text-center text-sm text-[#667085]">
              Don&#x27;t have an account?{" "}
              <Link href="/auth/create-account" className="font-medium text-[#FF6900] hover:underline">Create one</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
