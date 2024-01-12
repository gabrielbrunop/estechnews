import { createClient } from '@/utils/auth/server'
import creationTimeSec from '@/utils/time/creationTimeSec'
import timeSecToString from '@/utils/time/timeSecToString'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { readingTime } from 'reading-time-estimator'
import Link from 'next/link'
import 'highlight.js/styles/monokai-sublime.css'
import LikeButton from '@/app/_components/post/LikeButton'
import { FaCommentAlt } from 'react-icons/fa'
import CommentSection from '@/app/_components/comment/CommentSection'
import ParsedHtmlText from '@/app/_components/general/ParsedHtmlText'
import { Metadata } from 'next'
import configs from "@/app/configs.json"

type Props = {
  searchParams: { [key: string]: string | string[] | undefined },
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient(cookies());

  const { data: query } = await supabase
    .from("posts")
    .select("title")
    .eq("id", params.slug);

  if (!query || query.length === 0) notFound();

  const post = query[0];

  return {
    title: `${post.title} - ${configs.title}`
  }
}

export default async function Page({ searchParams, params }: Props) {
  const supabase = createClient(cookies());

  const highlightedCommentId = Number.isInteger(Number(searchParams.comment)) ? Number(searchParams.comment) : undefined;

  const { data: query } = await supabase
    .from('posts')
    .select(`
      *,
      author ( username ),
      post_likes (
        author (
          id
        )
      ),
      comments (
        id,
        author (
          username
        ),
        content,
        created_at
      )
    `)
    .eq("id", params.slug);

  if (!query || query.length === 0) notFound();

  const post = query[0];

  const creationTime = timeSecToString(creationTimeSec(post.created_at));
  const timeToRead = readingTime(post.content, undefined, "pt-br").text;
  const comments = (post.comments as { id: number, author: { username: string }, content: string, created_at: number }[])
    .map(c => ({ id: c.id, author: c.author, content: c.content, createdAt: c.created_at }))
    .sort((a, b) => b.createdAt - a.createdAt)
  
  const { data: userInfo } = await supabase.auth.getUser();
  const user = userInfo.user;

  const userLikedPost = user && post.post_likes.find((s: { author: { id: string } }) => s.author.id === user.id);

  return (
    <article className="w-full flex flex-col gap-3 py-4">
      <h1 className="text-4xl font-extrabold break-words">{post.title}</h1>
      <header className="w-full flex flex-col gap-4">
        <div className="flex text-sm sm:text-base gap-2 text-gray-500 whitespace-nowrap flex-wrap">
          <span>por <Link href={`/profile/${post.author.username}`} className="font-medium">{post.author.username}</Link></span>
          <span>há {creationTime}</span>
          <span>•</span>
          <span>{timeToRead}</span>
        </div>
      </header>
      <section className="w-full flex flex-col py-4 gap-3" >
        <ParsedHtmlText content={post.content} />
      </section>
      <section className="w-full flex flex-row">
        <LikeButton postId={post.id} likes={post.post_likes.length} userLiked={userLikedPost} />
        <span className="flex flex-row items-center gap-2 text-gray-500 font-medium gray-200 rounded py-1 px-3">
          <FaCommentAlt />
          {post.comments?.length ?? 0} comentários
        </span>
      </section>
      <section className="flex flex-col pt-8 gap-8">
        <hr />
        <CommentSection showCommentBox={!!user} comments={comments} postId={post.id} highlightedCommentId={highlightedCommentId} />
      </section>
    </article>
  )
}
