import { createClient } from '@supabase/supabase-js';

/**
 * Service-role Supabase client. Bypasses Row Level Security — use ONLY
 * in trusted server-side admin routes after the caller has already been
 * authenticated and authorized.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    'Missing SUPABASE_SERVICE_ROLE_KEY — admin operations will fail. ' +
      'Get it from: Supabase Dashboard → Settings → API → service_role key.'
  );
}

export const supabaseAdmin =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;
