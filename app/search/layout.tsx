import NavBar from '@/app/_components/navigation/NavBar'
import Footer from '@/app/_components/navigation/Footer'
import Main from '@/app/_components/general/Main'
import NavBarAccount from '@/app/_components/auth/NavBarAccount'
import TopLoader from '@/app/_components/navigation/TopLoader'

type Props = React.PropsWithChildren<{}>

export default async function Layout({ children }: Props) {
  return (
    <>
      <TopLoader />
      <NavBar>
        <div className="h-full flex w-full pl-10 gap-3 flex-row-reverse">
          <NavBarAccount />
        </div>
      </NavBar>
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  )
}