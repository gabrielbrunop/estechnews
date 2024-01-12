import { createClient } from '@/utils/auth/server'
import { cookies } from 'next/headers'
import ButtonList from "@/app/_components/feed/ButtonList"
import Pagination from '@/app/_components/navigation/Pagination'
import PostList from '@/app/_components/feed/PostList'
import getQueryPage from '@/utils/query/getQueryPage'
import getQueryOrder from '@/utils/query/getQueryOrder'
import getQueryRange from '@/utils/query/getQueryRange'
import getOrderClause from '@/utils/query/getOrderClause'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Index({ searchParams }: Props) {
  const supabase = createClient(cookies());

  const page = getQueryPage(searchParams.page);
  const orderBy = getQueryOrder(searchParams.orderBy);
  const [startRange, endRange, rangeStep] = getQueryRange(page);
  const orderClause = getOrderClause(orderBy);

  const search = supabase
    .from('posts')
    .select(`
      *,
      author ( * ),
      post_likes ( count ),
      comments ( count )
    `)
    .order(...orderClause)
    .range(startRange, endRange);

  const { data: posts } = await search;

  const postsLength = posts?.length ?? 0;

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <ButtonList selectedPostOption={orderBy} />
        <Pagination hasBefore={startRange > 0} hasNext={postsLength > rangeStep} thisPage={page} query={searchParams}>
          <PostList posts={posts?.slice(0, rangeStep)} />
        </Pagination>
      </div>
    </div>
  )
}
