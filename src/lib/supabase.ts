import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co").trim();
const supabaseAnonKey = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"
).trim();
const supabaseServiceKey = (
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key"
).trim();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase = createClient(supabaseUrl, supabaseAnonKey) as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey) as any;
