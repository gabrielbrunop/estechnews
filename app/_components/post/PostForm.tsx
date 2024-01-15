"use client"

import dynamic from "next/dynamic"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import LoadingMarkdownEditor from "@/app/_components/loading/LoadingPostEditor"
import { useFormState } from "react-dom"
import createPost from "@/app/_actions/createPost"

const Editor = dynamic(() => import ("@/app/_components/editors/Editor"), { ssr: false, loading: LoadingMarkdownEditor });

export default function PostForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(createPost, { messages: [] });

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  return (
    <form action={(formData) => {
      formData.set("content", text);
      formAction(formData);
    }} className="w-full flex flex-col gap-5">
      <input className="w-full rounded-md px-4 py-2 border-gray-400 border focus:outline-none" name="title" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      <Editor
        initialContent={text}
        onUpdate={setText}
        extensions={["links", "youtube"]}
        menu={["paragraphs", "bold", "italic", "strike", "code", "bulletList", "orderedList", "link", "youtube",
          "codeBlock", "blockquote", "hr", "undo", "redo", "clear"]}
      />
      {
        state.messages && state.messages.length > 0 && (
          <div className="rounded border-2 mt-2 py-2 border-red-200 bg-red-100">
            <ul>
              {state.messages.map(m => <p className="text-red-600 text-center">{m}</p>)}
            </ul>
          </div>
        )
      }
      <div className="flex flex-row gap-4 sm:ml-auto">
        <input type="button" value="Cancelar" className="w-full py-1.5 px-5 bg-red-400 sm:bg-inherit text-white sm:text-gray-400 font-bold cursor-pointer rounded" onClick={() => router.back()} />
        <button type="submit" className="w-full py-1.5 px-5 bg-green-700 text-white font-bold rounded">Enviar</button>
      </div>
    </form>
  )
}