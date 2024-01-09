import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-sm">
      <Link href="https://github.com/gabrielbrunop" className="font-medium text-indigo-500">
        @gabrielbrunop
      </Link>
    </footer>
  )
}