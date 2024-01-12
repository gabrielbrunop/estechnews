import Link from "next/link"
import { ParsedUrlQueryInput } from "querystring"
import React from "react"

type DisabledButtonProps = {
  label: string,
  side: "l" | "r"
}

type EnabledButtonProps = DisabledButtonProps & {
  nextPage: number,
  query?: ParsedUrlQueryInput
}

type Props = React.PropsWithChildren<{
  hasBefore: boolean,
  hasNext: boolean,
  thisPage: number,
  query?: ParsedUrlQueryInput
}>

function DisabledButton({ label, side }: DisabledButtonProps) {
  return (
    <button disabled className={`bg-gray-300 select-none text-gray-800 font-bold py-2 px-4 ${side === "l" ? "rounded-l" : "rounded-r"}`}>
      {label}
    </button>
  )
}

function EnabledButton({ nextPage, label, side, query }: EnabledButtonProps) {
  return (
    <Link href={{ query: { ...query, page: nextPage } }}>
      <button className={`bg-indigo-500 select-none text-white font-bold py-2 px-4 ${side === "l" ? "rounded-l" : "rounded-r"}`}>
        {label}
      </button>
    </Link>
  )
}

export default function Pagination({ hasBefore, hasNext, thisPage, query, children }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {children}
      {
        (hasBefore || hasNext) &&
          <div className="w-full flex justify-center">
            {
              hasBefore ?
                <EnabledButton nextPage={thisPage - 1} label="Anterior" side="l" query={query} /> :
                <DisabledButton label="Anterior" side="l" />
            }
            {
              hasNext ?
                <EnabledButton nextPage={thisPage + 1} label="Próximo" side="r" query={query} /> :
                <DisabledButton label="Próximo" side="r" />
            }
          </div>
      }
    </div>
  )
}