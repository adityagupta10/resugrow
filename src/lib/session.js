import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

/**
 * A unified session helper for Supabase-authenticated users.
 * Returns a consistent user object or null.
 *
 * IMPORTANT: The returned `id` is the Prisma user id.  When the user logged in
 * via Supabase OAuth the Supabase UUID may differ from a pre-existing Prisma
 * user row created before the auth migration. We reconcile by
 * falling back to an email look-up so that the dashboard query always hits the
 * correct rows regardless of which legacy auth flow created the Prisma record.
 */
export async function getUnifiedSession() {
  // Check Supabase session (email/password and OAuth).
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user }, error } = await supabase.auth.getUser();

    if (user && !error) {
      const email = user.email;

      // Try to find a Prisma user by the Supabase UUID first, then by email.
      let prismaUser = await prisma.user.findUnique({ where: { id: user.id } });

      if (!prismaUser && email) {
        prismaUser = await prisma.user.findUnique({ where: { email } });
      }

      // If no Prisma user exists at all, create one so the dashboard and
      // resume queries can work immediately without requiring the share API
      // to run first.
      if (!prismaUser) {
        const name =
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          (email ? email.split('@')[0] : null);

        try {
          prismaUser = await prisma.user.create({
            data: { id: user.id, email, name },
          });
        } catch (e) {
          // Unique constraint race — another request created it, fetch it.
          if (e?.code === 'P2002' && email) {
            prismaUser = await prisma.user.findUnique({ where: { email } });
          }
        }
      }

      // Return the Prisma user id (not the raw Supabase UUID) so that
      // dashboard queries match resume rows regardless of which auth
      // provider originally created the Prisma User.
      return {
        id: prismaUser?.id || user.id,
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
