type Props = React.PropsWithChildren<{}>

export default function Main({ children }: Props) {
  return (
    <main className="w-full max-w-6xl px-6 sm:px-16">
      {children}
    </main>
  )
}