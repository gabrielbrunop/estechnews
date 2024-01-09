"use server"

import { cookies } from 'next/headers'
import { createClient } from '@/utils/auth/server'
import { redirect } from 'next/navigation'
import { headers } from "next/headers"
import validateUsername from '@/utils/validation/validateUsername'

enum SignUpErrorStatus {
  ShortPassword = 422,
  CouldNotSendConfirmationEmail = 500 
}

export default async function signUp(prevState: any, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const username = String(formData.get('username'));

  const headersList = headers(); 
  const origin = headersList.get("origin");

  const { messages: errorMessages, valid: isUsernameValid } = validateUsername(username);
  if (!isUsernameValid) return { messages: errorMessages };

  const { data: matchedUsers } = await supabase.rpc("get_user_id_by_email_or_username", { email, username });
  if (matchedUsers.length > 0) return { messages: ["E-mail ou nome de usuário já estão em uso."] };

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback/sign-up`,
      data: {
        username
      }
    }
  });

  if (error) {
    switch (error.status) {
      case SignUpErrorStatus.ShortPassword:
        return { messages: ["Sua senha deve conter no mínimo 6 caracteres."] };
      case SignUpErrorStatus.CouldNotSendConfirmationEmail:
        return { messages: ["Não foi possível enviar o e-mail de confirmação."] };
      default:
        return { messages: ["Não foi possível continuar com o cadastro, tente novamente."] };
    }
  }
  
  redirect("/auth/sign-up/email/sent");
}