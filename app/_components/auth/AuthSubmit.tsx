"use client"

import { useFormStatus } from 'react-dom'

export default function Submit() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} className={`w-full py-1.5 mt-3 px-5 bg-green-700 text-white font-bold rounded ${pending ? "animate-pulse" : ""}`}>
      {pending ? "Carregando..." : "Continuar"}
    </button>
  )
}