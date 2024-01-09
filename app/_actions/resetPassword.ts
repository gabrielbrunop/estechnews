"use server"

import { cookies, headers } from 'next/headers'
import { createClient } from '@/utils/auth/server'
import { redirect } from 'next/navigation'

enum PasswordResetErrorStatus {
  RateLimited = 429
}

export default async function resetPassword(prevState: any, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const headersList = headers(); 
  const origin = headersList.get("origin");

  const email = String(formData.get('email'));

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/auth/update-password`
  });

  if (error) {
    switch (error.status) {
      case PasswordResetErrorStatus.RateLimited:
        return { messages: ["Aguarde um pouco antes de tentar novamente."] };
      default:
        return { messages: ["Não foi possível prosseguir."] };
    }
  }
  
  redirect("/auth/reset-password/check-email");
}