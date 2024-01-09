import { BsFillLightbulbFill } from "react-icons/bs"
import { AiFillFire } from "react-icons/ai"
import { IoMdAdd } from "react-icons/io"
import Link from "next/link"
import OrderOptions from "@/utils/consts/OrderOptions"

type OrderOptionsValues = typeof OrderOptions[keyof typeof OrderOptions];

type SelectionButtonProps = React.PropsWithChildren<{
  selected: boolean,
  option: OrderOptionsValues
}>

type Props = {
  selectedPostOption?: OrderOptionsValues | null
}

function SelectionButton({ selected, option, children }: SelectionButtonProps) {
  return (
    <Link className="flex items-center" href={{ pathname: "/", query: { orderBy: option } }}>
      {
        selected ?
          <button className={"flex items-center select-none gap-1.5 border-b-2 border-indigo-600 font-medium text-indigo-600"}>
            {children}
          </button> :
          <button className={"flex items-center select-none gap-1.5 font-medium text-gray-500"}>
            {children}
          </button>
      }
    </Link>
  )
}

export default function ButtonList({ selectedPostOption }: Props) {
  const option = [...Object.values(OrderOptions)].includes(selectedPostOption!) ? selectedPostOption : OrderOptions.Newest;

  return (
    <div className="w-full flex justify-between">
      <div className="inline-flex gap-5">
        <SelectionButton selected={option === OrderOptions.Newest} option={OrderOptions.Newest}>
          <span>Recente</span>
          <span><BsFillLightbulbFill /></span>
        </SelectionButton>
        <SelectionButton selected={option === OrderOptions.Hottest} option={OrderOptions.Hottest}>
          <span>Em alta</span>
          <span><AiFillFire /></span>
        </SelectionButton>
      </div>
      <Link href="/post/create">
        <button className="flex items-center gap-1.5 select-none bg-indigo-600 rounded-md pl-4 pr-3 py-1.5 text-white font-medium">
          <span>Criar</span>
          <span><IoMdAdd /></span>
        </button>
      </Link>
    </div>
  )
}