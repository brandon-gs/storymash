// Components
import { Head, Navbar, Dashboard, Loader, WithAuthRedirect } from "../components"
import { NextPage } from "next"
import { useSelector } from "../Hooks"

const IndexPage: NextPage = () => {
  const { auth } = useSelector(state => state.authentication)
  return (
    <WithAuthRedirect>
      <Loader></Loader>
      <Head title="Storymash"></Head>
      <Navbar></Navbar>
      {!auth && <Dashboard></Dashboard>}
      {auth && <h1>Ver historias XD</h1>}
    </WithAuthRedirect>
  )
}

/*export const getStaticProps = wrapper.getStaticProps(async ({ store, preview }) => {
  try {
    const getUser = await axios.get("http://localhost:3000/api/user/profile/gosu")
    console.log(getUser)
  } catch (e) {
    console.log(e)
    console.log("Error :c")
  }
})*/

export default IndexPage
