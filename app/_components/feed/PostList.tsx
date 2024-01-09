import PostCard from "@/app/_components/feed/PostCard";

type Props = {
  posts?: any[] | null,
  className?: string,
  notFoundClassName?: string
}

export default function PostList({ posts, className = "", notFoundClassName }: Props) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {
        posts && posts.length > 0 ?
          posts.map(p => <PostCard
            id={p.id}
            author={p.author.username}
            content={p.content}
            createdAt={p.created_at}
            title={p.title}
            key={p.id}
            thumbnail={p.thumbnail}
            upvotes={p.post_likes[0].count}
            comments={p.comments[0].count} />
          ) :
          <p className={notFoundClassName}>Nenhum post encontrado.</p>
      }
    </div>
  )
}
