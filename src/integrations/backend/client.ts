import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID as string | undefined;

// In some preview environments VITE_SUPABASE_URL may be temporarily missing.
// We can safely reconstruct it from the project id.
const backendUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  (projectId ? `https://${projectId}.supabase.co` : undefined);

const publishableKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
  (import.meta.env.SUPABASE_PUBLISHABLE_KEY as string | undefined);

if (!backendUrl) {
  throw new Error(
    "Backend URL is missing. Expected VITE_SUPABASE_URL or VITE_SUPABASE_PROJECT_ID to be defined."
  );
}

if (!publishableKey) {
  throw new Error(
    "Backend publishable key is missing. Expected VITE_SUPABASE_PUBLISHABLE_KEY to be defined."
  );
}

export const supabase = createClient<Database>(backendUrl, publishableKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const BACKEND_URL = backendUrl;
