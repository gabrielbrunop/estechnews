"use client"

import Link from "next/link"

export default function SettingsButton() {
  return (
    <Link href="/settings" className="bg-gray-300 px-4 py-1.5 rounded font-medium">Editar</Link>
  )
}