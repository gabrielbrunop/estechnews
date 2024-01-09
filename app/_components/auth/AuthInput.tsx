"use client"

import { useFormStatus } from 'react-dom'
import type { HTMLInputTypeAttribute } from 'react'

type InputProps = {
  name: string,
  type: HTMLInputTypeAttribute,
  label: string
}

export default function AuthInput({ name, type, label }: InputProps) {
  const { pending } = useFormStatus();

  return (
    <div className="relative w-full">
      <input type={type} name={name} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required disabled={pending} />
      <label htmlFor={name} className="absolute pointer-events-none text-sm text-gray-500 duration-300 transform -translate-y-4 scale-90 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 left-1">{label}</label>
    </div>
  )
}