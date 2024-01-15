"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import LoadingMarkdownEditor from "@/app/_components/loading/LoadingCommentEditor"
import { useFormState } from "react-dom"
import createComment from "../../_actions/createComment"

const Editor = dynamic(() => import ("@/app/_components/editors/Editor"), { ssr: false, loading: LoadingMarkdownEditor });

type Props = {
  postId: string
}

export default function CommentForm({ postId }: Props) {
  const [state, formAction] = useFormState(createComment, { result: "waiting", messages: [] });
  const [text, setText] = useState("");

  useEffect(() => {
    if (state.result === "success") window.location.reload();
  }, [state]);

  return (
    <form action={(formData) => {
      formData.set("post", postId);
      formData.set("content", text);

      formAction(formData);
    }} className="w-full flex flex-col gap-2">
      <Editor
        initialContent={text}
        onUpdate={setText}
        extensions={["links", "youtube"]}
        menu={["bold", "italic", "strike", "code", "codeBlock", "clear", "bulletList", "orderedList", "blockquote", "link"]}
        className="min-h-[6em] py-6 max-h-[20vh]"
        small
      />
      {
        state?.messages && state.messages.length > 0 && (
          <div className="rounded border-2 mt-2 py-2 border-red-200 bg-red-100">
            <ul>
              {state.messages.map(m => <p className="text-red-600 text-center">{m}</p>)}
            </ul>
          </div>
        )
      }
      <div className="flex flex-row gap-4 sm:ml-auto">
        <button type="submit" className="w-full py-1.5 px-5 bg-green-700 text-white font-bold rounded">Comentar</button>
      </div>
    </form>
  )
}