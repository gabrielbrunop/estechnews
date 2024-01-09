import LoadingPost from "@/app/_components/loading/LoadingPost";

export default async function Loading() {  
  return (
    <div className="w-full flex flex-col gap-10">
      <LoadingPost />
    </div>
  )
}