import { createBrowserClient, parse as parseCookie } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client.
 *
 * createBrowserClient is SSR-safe (Next.js client components are prerendered
 * on the server), so this may be called during prerendering. Placeholder
 * credentials are used when env vars are not configured so the app still
 * builds/renders — auth requests will fail until real keys are supplied via
 * .env.local (see .env.local.example).
 *
 * Never expose the service-role key in browser code.
 */
export function createClient(): SupabaseClient {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"
  );
}

/**
 * Read the Supabase access token cookie (for server components / API routes).
 * Used only with the anon key — never the service-role key.
 */
export function getAccessTokenFromCookies(cookieHeader?: string | null) {
  if (!cookieHeader) return null;
  const cookies = parseCookie(cookieHeader);
  return cookies["sb-access-token"] ?? null;
}
