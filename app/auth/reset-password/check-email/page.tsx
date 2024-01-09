import { Metadata } from "next"
import configs from "@/app/configs.json"

export const metadata: Metadata = {
  title: `Confirmação de e-mail - ${configs.title}`
}

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-5 items-center my-10 text-center">
      <h1 className="text-3xl font-bold">Verifique a caixa de entrada de seu e-mail</h1>
      <p className="text-lg sm:px-8">
        Caso haja um usuário com o endereço de e-mail especificado, enviaremos um e-mail
        de redefinição de senha para essa conta. Por favor, verifique sua caixa de entrada.
      </p>
    </div>
  )
}