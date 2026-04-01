import { auth } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

/**
 * A unified session helper that checks both Auth.js (NextAuth) and Supabase.
 * Returns a consistent user object or null.
 */
export async function getUnifiedSession() {
  // 1. Check Auth.js session (Google Login)
  try {
    const session = await auth();
    if (session?.user) {
      // Ensure the user exists in Prisma (synced by the PrismaAdapter)
      return {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        provider: 'next-auth'
      };
    }
  } catch (err) {
    console.error("Auth.js session check failed:", err);
  }

  // 2. Check Supabase session (Email/OTP/Link)
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user }, error } = await supabase.auth.getUser();

    if (user && !error) {
      // Map Supabase user to our consistent session format.
      // We also check if this user exists in Prisma.
      const email = user.email;
      const prismaUser = await prisma.user.findUnique({ where: { id: user.id } });
      
      return {
        id: user.id,
        name: prismaUser?.name || user.user_metadata?.full_name || email?.split('@')[0],
        email: email,
        image: user.user_metadata?.avatar_url || null,
        provider: 'supabase'
      };
    }
  } catch (err) {
    console.error("Supabase session check failed:", err);
  }

  return null;
}
