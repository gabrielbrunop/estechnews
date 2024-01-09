"use client"

import { createClient } from "@/utils/auth/client"

export default function SignInWithGoogle() {
  const supabase = createClient();

  const redirectUrl = typeof window !== "undefined" ? window.location.origin + "/auth/callback" : undefined;

  const handle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl
      }
    });
  }

  return (
    <button onClick={handle} className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700">
      <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
      <span>Continuar com o Google</span>
    </button>
  )
}