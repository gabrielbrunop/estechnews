import { createClient } from '@/utils/auth/server'
import { cookies } from 'next/headers'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import ChangeUsernameForm from '../_components/post/ChangeUsernameForm'

export const metadata: Metadata = {
  title: `Configurações`
}

export default async function Settings() {
  const supabase = createClient(cookies());
  const { data: sessionData } = await supabase.auth.getSession();

  if (!sessionData.session) redirect("/auth/sign-up");

  const { data: query } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", sessionData.session?.user.id);

  if (!query) redirect("/auth/sign-up");

  const profile = query[0];

  return (
    <div className="w-full flex flex-col gap-10">
      <h1 className="font-bold text-3xl">Configurações</h1>
      <div className="flex w-full md:w-3/5 lg:w-2/5">
        <ChangeUsernameForm originalUsername={profile.username} />
      </div>
    </div>
  )
}