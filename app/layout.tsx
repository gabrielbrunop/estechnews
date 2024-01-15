import '@/app/globals.css'
import configs from "@/app/configs.json"
import Footer from './_components/navigation/Footer'

export const metadata = {
  title: configs.title
}

type Props = React.PropsWithChildren<{}>

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt">
      <body className="bg-background text-foreground min-h-[100dvh]">
        <div className="flex flex-col min-h-[100dvh] gap-8">
          <div className="flex-1 w-full flex flex-col gap-8 sm:gap-12 items-center">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}