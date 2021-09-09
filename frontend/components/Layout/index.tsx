import { Navbar, Loader, Alert, MainMenu } from ".."
import { Fragment, ReactNode } from "react"
import MainMenuSpace from "./MainMenuSpace"

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
      <MainMenu />
      <MainMenuSpace />
    </Fragment>
  )
}
