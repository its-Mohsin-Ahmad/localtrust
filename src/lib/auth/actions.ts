// Compatibility shim: registration logic now lives in ./registration and runs
// entirely on the client (browser Supabase client) so it works under static
// export. This file no longer contains a "use server" directive.
export * from "./registration";
