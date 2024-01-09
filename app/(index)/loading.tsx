import ButtonList from "@/app/_components/feed/ButtonList"
import PaginationButtons from '@/app/_components/navigation/PaginationButtons'
import LoadingPostList from '@/app/_components/loading/LoadingPostList'

export default async function Loading() {
  const quantity = 5;
  
  return (
    <div className="w-full flex flex-col gap-10">
      <ButtonList selectedPostOption={null} />
      <LoadingPostList quantity={quantity} />
      <PaginationButtons hasBefore={false} hasNext={false} thisPage={1} />
    </div>
  )
}