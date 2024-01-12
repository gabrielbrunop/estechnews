"use server"

import { cookies } from 'next/headers'
import { createClient } from '@/utils/auth/server'
import validateUsername from '@/utils/validation/validateUsername'

const defaultErrorMessage = "Não foi possível alterar o nome de usuário.";
const defaultError = { status: "unchanged", messages: [defaultErrorMessage] };

export default async function updateUsername(prevState: any, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const username = String(formData.get('username'));

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return defaultError;

  const { messages: errorMessages, valid: isUsernameValid } = validateUsername(username);
  if (!isUsernameValid) return { status: "unchanged", messages: errorMessages };

  const matchedUsers = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username);

  if (matchedUsers.data?.length) return { status: "unchanged", messages: ["Nome de usuário já está em uso."] };

  const {  error } = await supabase
    .from("profiles")
    .update({ username })
    .eq("id", userData.user.id);

  if (error) return defaultError;

  return { status: "success", messages: [], username };
}