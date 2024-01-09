import creationTimeSec from "@/utils/time/creationTimeSec";
import timeSecToString from "@/utils/time/timeSecToString"
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai"
import { FaCommentAlt } from "react-icons/fa"

type Props = {
  id: string,
  author: string,
  title: string,
  content: string,
  createdAt: number,
  thumbnail?: string,
  upvotes: number,
  comments: number
}

export default async function PostCard({ id, author, title, createdAt, upvotes = 0, comments, thumbnail }: Props) {
  const creationTime = timeSecToString(creationTimeSec(createdAt));

  return (
    <article className="flex flex-col border-2 border-gray-200 rounded-md py-3 px-5 gap-1">
      <div className="flex gap-2 text-gray-500">
        <span>por <Link href={`/profile/${author}`} className="font-medium">{author}</Link></span>
        <span>•</span>
        <span>há {creationTime}</span>
      </div>
      <h1 className="text-lg font-medium break-words">
        <Link href={`/post/${id}`}>{title}</Link>
      </h1>
      <div className="flex flex-row gap-4">
        <span className="flex items-center gap-1.5 font-medium text-indigo-500 pt-2 text-sm"><AiFillHeart />{upvotes} curtida{upvotes === 1 ? "" : "s"}</span>
        <span className="flex items-center gap-1.5 font-medium text-gray-500 pt-2 text-sm"><FaCommentAlt />{comments} comentários</span>
      </div>
    </article>
  )
}
