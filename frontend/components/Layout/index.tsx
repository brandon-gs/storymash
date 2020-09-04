import { Navbar, Loader, Alert } from ".."
import { Fragment, ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <Fragment>
      <Navbar />
      <Loader></Loader>
      <Alert></Alert>
      {children}
    </Fragment>
  )
}
