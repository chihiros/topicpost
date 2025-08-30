import { ActionFunction, redirect } from "@remix-run/node";
import { SupabaseSignOut } from "../services/supabase/auth.supabase.server";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    throw new Response("Method not allowed", { status: 405 });
  }

  try {
    const response = await SupabaseSignOut(request);
    
    // ログアウト成功後、ホームページにリダイレクト
    return redirect("/", {
      headers: response.headers,
    });
  } catch (error) {
    console.error("Logout error:", error);
    // エラーが発生してもホームページにリダイレクト
    return redirect("/");
  }
};