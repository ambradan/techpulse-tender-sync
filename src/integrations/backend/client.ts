import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// Fallback values for preview environments where .env may not load
const FALLBACK_PROJECT_ID = "oabbwjrkiekegdivzjpg";
const FALLBACK_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hYmJ3anJraWVrZWdkaXZ6anBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MTc5NDksImV4cCI6MjA4MDI5Mzk0OX0.-EF5jbwrqtNNFXw6LkduZtxkrxyFzCm7SVMBsVWbxYM";

const projectId =
  (import.meta.env.VITE_SUPABASE_PROJECT_ID as string | undefined) ||
  FALLBACK_PROJECT_ID;

const backendUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  `https://${projectId}.supabase.co`;

const publishableKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
  FALLBACK_ANON_KEY;

export const supabase = createClient<Database>(backendUrl, publishableKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const BACKEND_URL = backendUrl;
