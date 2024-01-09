"use client"

import { createClient } from '@/utils/auth/client'

export default function SignOutButton() {
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <button onClick={signOut} className="bg-red-400 px-4 py-1.5 rounded font-medium">Sair</button>
  )
}