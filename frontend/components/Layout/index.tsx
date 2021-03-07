import { Navbar, Loader, Alert } from ".."
import { Fragment, ReactNode } from "react"
import UserBottomNavigation from "./UserBottomNavigation"

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <Fragment>
      <Navbar />
      <Loader />
      <Alert />
      {children}
      <UserBottomNavigation />
    </Fragment>
  )
}
