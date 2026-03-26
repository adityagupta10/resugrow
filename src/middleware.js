import { NextResponse } from 'next/server';

const protectedPaths = [
  '/resume/builder',
  '/resume/ats-checker',
  '/payment',
  '/cover-letter/create',
  '/linkedin-review',
  '/tools/sar-rewriter'
];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected) {
    // Check for NextAuth/Auth.js session tokens
    const sessionToken = req.cookies.get('authjs.session-token')?.value || 
                         req.cookies.get('__Secure-authjs.session-token')?.value || 
                         req.cookies.get('next-auth.session-token')?.value || 
                         req.cookies.get('__Secure-next-auth.session-token')?.value;

    if (!sessionToken) {
      const url = req.nextUrl.clone();
      url.pathname = '/api/auth/signin';
      url.searchParams.set('callbackUrl', req.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/resume/builder/:path*',
    '/resume/ats-checker/:path*',
    '/payment/:path*',
    '/cover-letter/create/:path*',
    '/linkedin-review/:path*',
    '/tools/sar-rewriter/:path*',
  ],
};
