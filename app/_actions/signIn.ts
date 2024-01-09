"use server"

import { cookies } from 'next/headers'
import { createClient } from '@/utils/auth/server'
import { redirect } from 'next/navigation'

enum SignInErrorStatus {
  WrongCredentials = 400
}

export default async function signIn(prevState: any, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    switch (error.status) {
      case SignInErrorStatus.WrongCredentials:
        return { messages: ["E-mail ou senha estão incorretos."] };    
      default:
        return { messages: ["Não foi possível realizar o login."] };
    }
  }
  
  redirect("/");
}