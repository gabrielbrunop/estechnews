import configs from "@/app/configs.json"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Erro - ${configs.title}`
}

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center my-10">
      <h1 className="text-xl">Um erro foi encontrado e não foi possível realizar o login.</h1>
    </div>
  )
}