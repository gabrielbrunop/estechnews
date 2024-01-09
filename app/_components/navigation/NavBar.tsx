import Link from 'next/link'
import configs from "@/app/configs.json"

type Props = React.PropsWithChildren<{}>

export default function NavBar({ children }: Props) {
  return (
    <nav className="w-full flex justify-center bg-indigo-600 max-h-14">
      <div className="w-full max-w-6xl flex justify-between items-center p-3 px-6 sm:px-16 text-sm">
        <Link href="/">
          <h1 className="text-2xl font-bold text-white select-none">
            {configs.title}
          </h1>
        </Link>
        <div className="h-full">
          {children}
        </div>
      </div>
    </nav>
  )
}