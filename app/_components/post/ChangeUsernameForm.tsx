"use client"

import updateUsername from "@/app/_actions/updateUsername";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

type Props = {
  originalUsername: string
}

export default function ChangeUsernameForm({ originalUsername }: Props) {
  const [state, formAction] = useFormState(updateUsername, { status: "unchanged", messages: [], username: originalUsername });
  const [currentUsername, setCurrentUsername] = useState(originalUsername);
  const [username, setUsername] = useState(originalUsername);

  useEffect(() => {
    if (state.status === "success" && (state as any).username) {
      setCurrentUsername((state as any).username);
    }
  }, [state]);

  const sameUsername = currentUsername === username;
  
  return (
    <form className="w-full flex flex-col gap-2" action={formAction}>
      <p className="font-medium text-lg">Alterar nome de usuário</p>
      <div className="flex flex-row gap-2">
        <input className="w-full rounded-md px-4 py-2 border-gray-400 border focus:outline-none" name="username" placeholder="Nome de usuário" value={username} onChange={e => setUsername(e.target.value)} required />
        <button type="submit" disabled={sameUsername} className={`w-fit py-1.5 px-5 ${sameUsername ? "bg-gray-400" : "bg-blue-600"} text-white font-bold rounded`}>Alterar</button>
      </div>
      {
        state.status === "unchanged" && state.messages && state.messages.length > 0 && (
          <div className="rounded border-2 mt-2 py-2 border-red-200 bg-red-100">
            <ul>
            {state.messages.map(m => <p className="text-red-600 text-center">{m}</p>)}
            </ul>
          </div>
        )
      }
      {
        state.status === "success" && (
          <div className="rounded border-2 mt-2 py-2 border-green-300 bg-green-200">
            <p className="text-green-800 text-center">Nome de usuário alterado com sucesso!</p>
          </div>
        )
      }
    </form>
  )
}