import LoadingPostCard from "@/app/_components/loading/LoadingPostCard";

type Props = {
  quantity: number
}

export default function LoadingPostList({ quantity }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {
        Array.from({ length: quantity }, (_, i) => <LoadingPostCard key={i} />)
      }
    </div>
  )
}