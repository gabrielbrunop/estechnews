import NavBar from '@/app/_components/navigation/NavBar'
import Footer from '@/app/_components/navigation/Footer'
import Main from '@/app/_components/general/Main'
import TopLoader from '@/app/_components/navigation/TopLoader'

type Props = React.PropsWithChildren<{}>

export default function Layout({ children }: Props) {
  return (
    <>
      <TopLoader />
      <NavBar />
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  )
}