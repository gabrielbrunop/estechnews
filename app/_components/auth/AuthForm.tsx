"use client"

import { useFormState } from 'react-dom'

type AuthServerAction = (prevState: any, formData: FormData) => Promise<{ messages: string[]; }>

type Props = React.PropsWithChildren<{
  action: AuthServerAction
}>

export default function AuthForm({ children, action }: Props) {
  const [state, formAction] = useFormState(action, { messages: [] });

  return (
    <form action={formAction} className="w-full sm:w-96 lg:w-[35%] flex flex-col gap-3">
      {children}
      {
        state.messages && state.messages.length > 0 && (
          <div className="rounded border-2 mt-2 py-2 border-red-200 bg-red-100">
            <ul>
              {
                state.messages.map(m => <p className="text-red-600 text-center">{m}</p>)
              }
            </ul>
          </div>
        )
      }
    </form>
  )
}