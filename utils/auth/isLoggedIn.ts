import { createClient } from "@/utils/auth/server"
import { cookies } from "next/headers";

export default async function isLoggedIn() {
  const supabase = createClient(cookies());

  const { data: sessionData } = await supabase.auth.getSession();

  return !!sessionData.session;
}