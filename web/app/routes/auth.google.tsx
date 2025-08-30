import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { SupabaseSignInWithProvider } from "../services/supabase/auth.supabase.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const result = await SupabaseSignInWithProvider(request, "google");
    
    // OAuth URLにリダイレクト
    return redirect(result.url!, {
      headers: result.headers,
    });
  } catch (error: any) {
    console.error("Google login error:", error);
    return redirect("/login?error=google_auth_failed");
  }
};