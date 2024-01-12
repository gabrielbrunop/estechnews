import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full p-4 flex justify-center text-center text-sm bg-slate-600">
      <Link href="https://github.com/gabrielbrunop" className="font-medium text-white">
        @gabrielbrunop
      </Link>
    </footer>
  )
}