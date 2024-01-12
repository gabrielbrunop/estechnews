import ButtonList from "@/app/_components/feed/ButtonList"
import Pagination from '@/app/_components/navigation/Pagination'
import LoadingPostList from '@/app/_components/loading/LoadingPostList'

export default async function Loading() {
  const quantity = 5;
  
  return (
    <div className="w-full flex flex-col gap-10">
      <ButtonList selectedPostOption={null} />
      <Pagination hasBefore={false} hasNext={false} thisPage={1}>
        <LoadingPostList quantity={quantity} />
      </Pagination>
    </div>
  )
}