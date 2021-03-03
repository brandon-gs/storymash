// Types
import { NextPage } from "next"
// Components
import { Layout, Dashboard, MainMenu } from "../components"
import Head from "next/head"
// Hooks
import { useSelector } from "react-redux"
// ServerProps
import { configUser, configFavoritesStories, configAllStories } from "../services"
// Helpers
import { wrapper } from "../store"

const IndexPage: NextPage = () => {
  const { auth } = useSelector(state => state.authentication)
  return (
    <Layout>
      <Head>
        <title>Storymash</title>
      </Head>
      {!auth && <Dashboard />}
      {auth && (
        <>
          <MainMenu />
        </>
      )}
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
  const isAuthenticated = ctx.store.getState().authentication.auth
  if (isAuthenticated) {
    await configFavoritesStories(ctx)
    await configAllStories(ctx)
  }
})

export default IndexPage
