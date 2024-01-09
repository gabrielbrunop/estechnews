import configs from "@/app/configs.json"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Confirme seu e-mail - ${configs.title}`
}

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-5 items-center my-10">
      <h1 className="text-3xl font-bold">E-mail de confirmação enviado</h1>
      <p>Verifique seu endereço de e-mail para continuar com o cadastro.</p>
    </div>
  )
}