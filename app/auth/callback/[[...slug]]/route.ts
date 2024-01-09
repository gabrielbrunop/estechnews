import { createClient } from '@/utils/auth/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request, { params }: { params: { slug: string[] } }) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const isSignUp = params.slug?.includes("sign-up");

  const errorRedirectUrl = requestUrl.origin + "/auth/error";
  const redirectUrl = requestUrl.origin + (isSignUp ? "/auth/sign-up/email/confirmed/" : "/");

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch (err) {
      return NextResponse.redirect(errorRedirectUrl);
    }
  }

  return NextResponse.redirect(redirectUrl);
}
