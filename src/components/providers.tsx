"use client";

import { createClient } from "@/lib/supabase/client";
import { createContext, useContext, useState } from "react";

const SupabaseContext = createContext<ReturnType<typeof createClient> | null>(
  null
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [supabaseClient] = useState(() => createClient());

  return (
    <SupabaseContext.Provider value={supabaseClient}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const client = useContext(SupabaseContext);
  if (!client) {
    throw new Error("useSupabase must be used within Providers");
  }
  return client;
}
