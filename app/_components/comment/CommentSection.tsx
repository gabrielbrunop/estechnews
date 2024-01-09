import Comment from "./Comment"
import CommentForm from "./CommentForm"
import ScrollTo from "../general/ScrollTo"

type CommentType = {
  id?: number,
  author: { username: string },
  content: string,
  post?: string,
  parent?: string,
  createdAt: number
}

type Props = {
  postId: string,
  comments: CommentType[],
  highlightedCommentId?: number,
  showCommentBox?: boolean
}

function getCommentListWithHighlightedComment(highlightId: number, comments: CommentType[]) {
  const highlightComment = comments.find(c => c.id === highlightId);
  if (!highlightComment) return comments;

  return [
    highlightComment,
    ...comments.filter(c => c.id !== highlightId)
  ];
}

export default function CommentSection({ comments, postId, highlightedCommentId, showCommentBox=false }: Props) {
  const commentList = highlightedCommentId ? getCommentListWithHighlightedComment(highlightedCommentId, comments) : comments;
  
  return (
    <div className="flex flex-col gap-6 sm:gap-4">
      <h1 className="text-2xl sm:text-xl font-medium text-gray-700 pb-1 sm:pb-3">Comentários</h1>
      {showCommentBox && <CommentForm postId={postId} />}
      <div className={`flex flex-col gap-6 ${showCommentBox ? "pt-8" : "pt-2"} sm:pt-0`}>
        {commentList.map(c => c.id === highlightedCommentId ?
          <ScrollTo><Comment author={c.author} content={c.content} createdAt={c.createdAt} /></ScrollTo> :
          <Comment author={c.author} content={c.content} createdAt={c.createdAt} />
        )}
      </div>
    </div>
  )
}