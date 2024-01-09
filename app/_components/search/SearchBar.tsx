"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"

type Props = {
  className?: string
}

export default function SearchBar({ className = "" }: Props) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || null);

  const handleChange: React.ChangeEventHandler<HTMLFormElement> = e => setQuery(e.target.value);

  return (
    <form onChange={handleChange} className={`flex gap-4 bg-white border-2 border-gray-300 p-2 py-2 pr-3 pl-5 rounded-full ${className}`}>
      <button type="submit" className="text-gray-800 text-2xl pl-2">
        <span>
          <AiOutlineSearch className="rotate-90" />
        </span>
      </button>
      <input defaultValue={query ?? ""} name="query" type="text" className="border-none w-full focus:outline-0 bg-inherit text-gray-800" placeholder="Pesquisar..." />
    </form>
  )
}