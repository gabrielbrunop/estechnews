import PostForm from "@/app/_components/post/PostForm";
import redirectAuth from "@/utils/auth/redirectAuth";
import { Metadata } from "next";
import configs from "@/app/configs.json"

export const metadata: Metadata = {
  title: `Criar nova postagem - ${configs.title}`
}

export default async function Page() {
  await redirectAuth("notLoggedIn");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-gray-900">Criar nova postagem</h1>
      <PostForm />
    </div>
  )
}