// Components
import { Head, Layout, Dashboard, MainMenu } from "../components"
import { NextPage } from "next"
import { useSelector } from "../Hooks"
import { wrapper } from "../store"
import { configUser, configFavoritesStories } from "../getServerProps"

const IndexPage: NextPage = () => {
  const { auth } = useSelector(state => state.authentication)
  return (
    <Layout>
      <Head title="Storymash"></Head>
      {!auth && <Dashboard></Dashboard>}
      {auth && <MainMenu />}
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
  await configFavoritesStories(ctx)
})

export default IndexPage
