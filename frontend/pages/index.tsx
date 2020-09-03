// Components
import { Head, Navbar, Dashboard } from "../components"
import { NextPage } from "next"
import { wrapper } from "../store"
import { getCookie } from "../utils/cookie"

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
  const token = getCookie("token", false)
})

const IndexPage: NextPage = () => {
  return (
    <>
      <Head title="Storymash"></Head>
      <Navbar></Navbar>
      <Dashboard></Dashboard>
    </>
  )
}

export default IndexPage
