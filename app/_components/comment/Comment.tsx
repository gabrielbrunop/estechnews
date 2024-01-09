import Link from "next/link"
import timeSecToString from "@/utils/time/timeSecToString"
import creationTimeSec from "@/utils/time/creationTimeSec"
import ParsedHtmlText from "../general/ParsedHtmlText"

type CommentProps = {
  author: { username: string },
  content: string,
  createdAt: number,
  highlighted?: boolean
}

export default function Comment({ author, content, createdAt }: CommentProps) {
  const creationTime = timeSecToString(creationTimeSec(createdAt));

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2 text-gray-500 items-center">
        <span className="font-medium text-black"><Link href={`/profile/${author.username}`} className="font-medium">{author.username}</Link></span>
        <span className="text-sm">há {creationTime}</span>
      </div>
      <ParsedHtmlText content={content} />
    </div>
  )
}