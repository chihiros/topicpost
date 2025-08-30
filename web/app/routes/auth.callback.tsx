import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createSupabaseServerClient } from "../services/supabase/supabase.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/";

  if (code) {
    const supabase = createSupabaseServerClient(request);
    
    const { error } = await supabase.client.auth.exchangeCodeForSession(code);
    
    if (!error) {
      return redirect(next, {
        headers: supabase.headers,
      });
    }
  }

  // エラーの場合はログインページにリダイレクト
  return redirect("/login?error=auth_failed");
};