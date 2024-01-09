import Link from "next/link"
import { ParsedUrlQueryInput } from "querystring"

type DisabledButtonProps = {
  label: string,
  side: "l" | "r"
}

type EnabledButtonProps = DisabledButtonProps & {
  nextPage: number,
  query?: ParsedUrlQueryInput
}

type Props = {
  hasBefore: boolean,
  hasNext: boolean,
  thisPage: number,
  query?: ParsedUrlQueryInput
}

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

export default function PaginationButtons({ hasBefore, hasNext, thisPage, query }: Props) {
  return (
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
  )
}