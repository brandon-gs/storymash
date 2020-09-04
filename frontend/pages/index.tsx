// Components
import { Head, Layout, Dashboard } from "../components"
import { NextPage } from "next"
import { useSelector } from "../Hooks"
import { wrapper } from "../store"
import { configUser } from "../getServerProps"

const IndexPage: NextPage = () => {
  const { auth } = useSelector(state => state.authentication)
  return (
    <Layout>
      <Head title="Storymash"></Head>
      {!auth && <Dashboard></Dashboard>}
      {auth && <h1>Mostrar historias</h1>}
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
})

export default IndexPage
