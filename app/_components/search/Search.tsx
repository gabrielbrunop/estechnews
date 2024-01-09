import Link from "next/link"
import { AiOutlineSearch } from "react-icons/ai"

export default function Search() {
  return (
    <Link href="/search">
      <div className="flex sm:justify-between items-center sm:bg-indigo-800 h-full sm:w-52 sm:pr-3 sm:pl-5 rounded-full sm:rounded-md">
        <p className="text-indigo-200 hidden sm:block">Pesquisar...</p>
        <span className="text-gray-400 text-2xl sm:text-lg">
          <AiOutlineSearch />
        </span>
      </div>
    </Link>
  )
}