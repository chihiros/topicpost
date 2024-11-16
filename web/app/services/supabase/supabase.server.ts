import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr"

export function createSupabaseServerClient(request: Request) {
  const supabaseUrl = process.env.SUPABASE_API_URL
  if (!supabaseUrl) {
    throw new Error('SUPABASE_API_URL is not defined')
  }

  const supabaseKey = process.env.SUPABASE_ANON_KEY
  if (!supabaseKey) {
    throw new Error('SUPABASE_ANON_KEY is not defined')
  }

  const headers = new Headers();
  const client = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') || '');
      },
      setAll(cookies) {
        cookies.forEach(cookie => {
          headers.append('Set-Cookie', serializeCookieHeader(cookie.name, cookie.value, cookie.options));
        });
      }
    },
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },
    cookieEncoding: 'base64url',
  });

  return { client, headers };
}
