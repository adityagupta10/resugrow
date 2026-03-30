import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

function getSafeNextPath(nextParam) {
  if (!nextParam || typeof nextParam !== 'string') return '/dashboard';
  if (!nextParam.startsWith('/') || nextParam.startsWith('//')) return '/dashboard';
  return nextParam;
}

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const nextParam = getSafeNextPath(requestUrl.searchParams.get('next'));
  const redirectUrl = new URL(nextParam, requestUrl.origin);

  if (!code) {
    return NextResponse.redirect(new URL('/login', requestUrl.origin));
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const loginUrl = new URL('/login', requestUrl.origin);
    loginUrl.searchParams.set('error', 'oauth_callback_failed');
    loginUrl.searchParams.set('callbackUrl', redirectUrl.toString());
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.redirect(redirectUrl);
}
