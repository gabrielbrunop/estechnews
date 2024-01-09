import redirectAuth from '@/utils/auth/redirectAuth';
import AuthForm from '@/app/_components/auth/AuthForm';
import AuthInput from '@/app/_components/auth/AuthInput';
import AuthSubmit from '@/app/_components/auth/AuthSubmit';
import resetPassword from '@/app/_actions/resetPassword';
import configs from "@/app/configs.json"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Resetar senha - ${configs.title}`
}

export default async function Page() {
  await redirectAuth("loggedIn");

  return (
    <div className="w-full flex flex-col gap-5 items-center my-10">
      <h1 className="text-3xl font-bold">Resete sua senha</h1>
      <AuthForm action={resetPassword}>
        <AuthInput name="email" type="email" label="Endereço de e-mail" />
        <AuthSubmit />
      </AuthForm>
    </div>
  )
}