"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import configs from "@/app/configs.json"
import { Metadata } from "next"

const redirectWaitTime = 5 * 1000;

export const metadata: Metadata = {
  title: `E-mail verificado com sucesso - ${configs.title}`
}

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push("/"), redirectWaitTime);
  }, [router]);

  return (
    <div className="w-full flex flex-col gap-5 items-center my-10">
      <h1 className="text-3xl font-bold">Seja bem-vindo</h1>
      <p>Seu endereço de e-email foi verificado com sucesso! Você será redirecionado para a página principal em breve.</p>
    </div>
  )
}