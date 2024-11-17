import { createSupabaseServerClient } from "./supabase.server";

export const SupabaseLoginWithPassword = async (
  request: Request,
  email: string,
  password: string,
) => {
  const supabase = createSupabaseServerClient(request);
  const response = await supabase.client.auth.signInWithPassword({ email, password });

  if (response.error) {
    if (response.error.code === "invalid_credentials") {
      throw new Error("メールアドレスまたはパスワードが間違っています");
    }

    throw new Error("ログインに失敗しました");
  }

  return Response.json({
    data: response.data,
    error: response.error,
  }, {
    headers: supabase.headers,
  });
}

export const isUserLoggedIn = async (request: Request) => {
  const supabase = createSupabaseServerClient(request);

  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  return !!user;
};

export const SupabaseSignOut = async (
  request: Request,
) => {
  const supabase = createSupabaseServerClient(request);
  const { error } = await supabase.client.auth.signOut();

  if (error) {
    throw new Error("ログアウトに失敗しました");
  }

  return Response.json({
    error,
  }, {
    headers: supabase.headers,
  });
}
