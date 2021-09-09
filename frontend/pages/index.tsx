// Types
import { NextPage } from "next"
// Components
import { Box } from "@material-ui/core"
import { Layout, Dashboard, AllStories } from "components"
import Head from "next/head"
// Hooks
import { useSelector } from "react-redux"
// ServerProps
import { configUser, configFavoritesStories, configAllStories } from "services"
// Helpers
import { wrapper } from "store"

const IndexPage: NextPage = () => {
  const { auth } = useSelector(state => state.authentication)
  return (
    <Layout>
      <Head>
        <title>Storymash</title>
      </Head>
      {!auth && <Dashboard />}
      {auth && (
        <Box mt={3}>
          <AllStories />
        </Box>
      )}
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  await configUser(ctx, store)
  const isAuthenticated = store.getState().authentication.auth
  if (isAuthenticated) {
    await configFavoritesStories(ctx, store)
    await configAllStories(ctx, store)
  }
  return {
    props: {},
  }
})

export default IndexPage
