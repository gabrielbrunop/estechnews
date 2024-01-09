import '@/app/globals.css'
import configs from "@/app/configs.json"

export const metadata = {
  title: configs.title
}

type Props = React.PropsWithChildren<{}>

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt">
      <body className="bg-background text-foreground">
        <div className="flex-1 w-full flex flex-col gap-8 sm:gap-12 items-center">
          {children}
        </div>
      </body>
    </html>
  )
}