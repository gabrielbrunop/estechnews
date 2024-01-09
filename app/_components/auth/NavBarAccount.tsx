import isLoggedIn from '@/utils/auth/isLoggedIn'
import Link from 'next/link'
import { BiSolidUser } from "react-icons/bi"

export default async function NavBarAccount() {
  return (
    await isLoggedIn() ?
      (
        <Link href="/profile">
          <button className="h-full px-1.5 bg-gray-300 text-gray-700 font-bold text-xl rounded"><BiSolidUser /></button>
        </Link>
      ) : 
      (
        <div className="h-full flex gap-2">
          <Link href="/auth/sign-in">
            <button className="h-full px-4 bg-indigo-800 text-white font-bold rounded">Entrar</button>
          </Link>
          <Link href="/auth/sign-up">
            <button className="h-full hidden sm:block px-3 bg-emerald-600 text-white font-bold rounded">Cadastrar</button>
          </Link>
        </div>
      )
  )
}