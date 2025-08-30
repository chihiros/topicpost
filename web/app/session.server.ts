import { redirect } from "@remix-run/node";
import { createSupabaseServerClient } from "./services/supabase/supabase.server";

// Supabaseからユーザー情報を取得
export async function getUser(request: Request) {
  const supabase = createSupabaseServerClient(request);
  
  const {
    data: { user },
    error,
  } = await supabase.client.auth.getUser();

  if (error || !user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email || "",
    displayName: user.user_metadata?.displayName || user.user_metadata?.full_name || user.email || "ユーザー"
  };
}

// ログイン必須ページでユーザーをチェック
export async function requireUser(request: Request, redirectTo?: string) {
  const user = await getUser(request);
  if (!user) {
    const url = new URL(request.url);
    const currentPath = redirectTo || url.pathname + url.search;
    const searchParams = new URLSearchParams([["redirectTo", currentPath]]);
    throw redirect(`/login?${searchParams}`);
  }
  return user;
}

// ログイン状態をチェック
export async function isLoggedIn(request: Request): Promise<boolean> {
  const user = await getUser(request);
  return !!user;
}