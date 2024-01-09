import configs from "@/app/configs.json"
import { Metadata } from "next"
import TimeRedirect from "@/app/_components/general/TimeRedirect";

const redirectWaitTime = 5 * 1000;

export const metadata: Metadata = {
  title: `E-mail verificado com sucesso - ${configs.title}`
}

export default function Page() {
  return (
    <TimeRedirect redirectWaitTime={redirectWaitTime}>
      <div className="w-full flex flex-col gap-5 items-center my-10">
        <h1 className="text-3xl font-bold">Seja bem-vindo</h1>
        <p>Seu endereço de e-email foi verificado com sucesso! Você será redirecionado para a página principal em breve.</p>
      </div>
    </TimeRedirect>
  )
}