import { SupabaseSignOut } from "../services/supabase/auth.supabase.server";

export async function action({ request }: { request: Request }) {
  try {
    await SupabaseSignOut(request);
    return new Response(null, { status: 303, headers: { Location: "/" } });
  } catch (error) {
    console.error(error);
    return new Response("ログアウトに失敗しました", { status: 500 });
  }
}
