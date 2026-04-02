import { NextResponse } from "next/server";

const protectedPaths = [
  "/resume/builder",
  "/resume/ats-checker",
  "/payment",
  "/cover-letter/create",
  "/linkedin-review",
  "/tools/sar-rewriter",
  "/tools/interview-prep",
  "/tools/linkedin-studio",
  "/tools/salary-coach",
  "/dashboard",
  "/settings",
];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected) {
    // Check for NextAuth/Auth.js session tokens
    const sessionToken =
      req.cookies.get("authjs.session-token")?.value ||
      req.cookies.get("__Secure-authjs.session-token")?.value ||
      req.cookies.get("next-auth.session-token")?.value ||
      req.cookies.get("__Secure-next-auth.session-token")?.value;
    // Supabase auth cookie keys look like:
    // sb-<project-ref>-auth-token, sb-<project-ref>-auth-token.0, sb-<project-ref>-auth-token.1
    const hasSupabaseSession = req.cookies
      .getAll()
      .some((cookie) => /^sb-.*-auth-token(?:\.\d+)?$/.test(cookie.name));

    if (!sessionToken && !hasSupabaseSession) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/resume/builder/:path*",
    "/resume/ats-checker/:path*",
    "/payment/:path*",
    "/cover-letter/create/:path*",
    "/linkedin-review/:path*",
    "/tools/sar-rewriter/:path*",
    "/tools/interview-prep/:path*",
    "/tools/linkedin-studio/:path*",
    "/tools/salary-coach/:path*",
    "/dashboard/:path*",
    "/settings/:path*",
  ],
};
