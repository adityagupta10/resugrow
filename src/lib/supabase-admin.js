import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    'Missing SUPABASE_SERVICE_ROLE_KEY — admin operations will fail. ' +
    'Get it from: Supabase Dashboard → Settings → API → service_role key.'
  );
}

// Service-role client bypasses RLS — use ONLY in server-side admin routes
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;
