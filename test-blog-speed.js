const { createClient } = require('@supabase/supabase-js');
const start = Date.now();
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
supabase.from('BlogPost').select('title').eq('isPublished', true).then(() => {
  console.log('Supabase time:', Date.now() - start);
});
