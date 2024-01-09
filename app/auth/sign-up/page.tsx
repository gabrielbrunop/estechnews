import Link from 'next/link'
import redirectAuth from '@/utils/auth/redirectAuth'
import AuthForm from '@/app/_components/auth/AuthForm'
import signUp from '@/app/_actions/signUp'
import AuthInput from '@/app/_components/auth/AuthInput'
import AuthSubmit from '@/app/_components/auth/AuthSubmit'
import HorizontalLineWithText from '@/app/_components/general/HorizontalLineWithText'
import SignInWithGoogle from '@/app/_components/auth/SignInWithGoogle'
import configs from "@/app/configs.json"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Crie sua conta - ${configs.title}`
}

export default async function Page() {
  await redirectAuth("loggedIn");

  return (
    <div className="w-full flex flex-col gap-5 items-center my-10">
      <h1 className="text-3xl font-bold">Crie sua conta</h1>
      <AuthForm action={signUp}>
        <AuthInput name="username" type="text" label="Nome de usuário" />
        <AuthInput name="email" type="email" label="Endereço de e-mail" />
        <AuthInput name="password" type="password" label="Senha" />
        <AuthSubmit />
      </AuthForm>
      <Link href="/auth/sign-in" className="text-blue-600 font-medium">Já tenho uma conta</Link>
      <HorizontalLineWithText text="ou" />
      <SignInWithGoogle />
    </div>
  )
}