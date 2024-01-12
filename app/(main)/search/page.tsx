import { createClient } from '@/utils/auth/server'
import { cookies } from 'next/headers'
import PaginationButtons from '@/app/_components/navigation/PaginationButtons'
import PostList from '@/app/_components/feed/PostList'
import SearchBar from '@/app/_components/search/SearchBar'
import getQueryOrder from '@/utils/query/getQueryOrder'
import getQueryPage from '@/utils/query/getQueryPage'
import getQueryRange from '@/utils/query/getQueryRange'
import getOrderClause from '@/utils/query/getOrderClause'
import { Metadata } from 'next'
import configs from "@/app/configs.json"

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const query = searchParams.query;
  const page = getQueryPage(searchParams.page);

  return {
    title: query ?
      `Pesquisando por ${query} - Página ${page} - technews` :
      `Pesquisa - ${configs.title}`
  }
}

export default async function Index({ searchParams }: Props) {
  const supabase = createClient(cookies());

  const page = getQueryPage(searchParams.page);
  const orderBy = getQueryOrder(searchParams.orderBy);
  const query = searchParams.query;
  const [startRange, endRange, rangeStep] = getQueryRange(page);
  const orderClause = getOrderClause(orderBy);

  const { data: posts } = await supabase
    .from('posts')
    .select(`
      *,
      author ( * ),
      post_likes ( count ),
      comments ( count )
    `)
    .order(...orderClause)
    .textSearch('post_query', `"${query}"`, { type: 'plain', config: 'english' })
    .range(startRange, endRange);
  
  const postsLength = posts?.length ?? 0;

  return (
    <div className="w-full flex flex-col gap-10 items-center">
      <h1 className="text-3xl pt-5 sm:pt-0 sm:text-4xl font-bold">Pesquise por conteúdo</h1>
      <SearchBar className="w-full sm:w-96" />
      { query && <p className="-mt-1 -mb-4 text-gray-700">Pesquisando por {query}</p> }
      <PostList className="w-full" notFoundClassName="text-center py-4 text-gray-500" posts={posts?.slice(0, rangeStep)} />
      <PaginationButtons hasBefore={startRange > 0} hasNext={postsLength > rangeStep} thisPage={page} query={searchParams} />
    </div>
  )
}