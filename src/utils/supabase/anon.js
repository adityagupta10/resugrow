import { createClient } from '@supabase/supabase-js';

/**
 * Stateless anon-key Supabase client for public reads (e.g. ISR pages
 * fetching published content). No cookie/session handling — use
 * `./server` when the request needs the signed-in user's context.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
