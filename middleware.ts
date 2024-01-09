import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name, options) {
          request.cookies.delete({
            name,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.delete({
            name,
            ...options,
          });
        },
      },
    }
  );

  if (request.nextUrl.pathname === "/profile") {
    const url = request.nextUrl;

    const { data: userData } = await supabase.auth.getUser();

    const user = userData.user;
    if (!user) {
      url.pathname = "404";
      return NextResponse.rewrite(url);
    }

    const { data: query } = await supabase
    .from('profiles')
    .select(`
      username
    `)
    .eq("id", userData.user.id);

    if (!query || query.length === 0) {
      url.pathname = "404";
      return NextResponse.rewrite(url);
    }

    const profile = query[0];

    url.pathname = `/profile/${profile.username}`;
    return NextResponse.redirect(url);
  }

  await supabase.auth.getSession();

  return response;
}
