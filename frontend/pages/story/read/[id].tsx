// Types
import { NextPage } from "next"
// Components
import { Layout, ReadStory } from "../../../components"
import Head from "next/head"
// ServerSideProps
import { configUser, configStory } from "../../../services"
// Helpers
import { wrapper } from "../../../store"

interface ReadStoryPageProps {
  title: string
}

const ReadStoryPage: NextPage<ReadStoryPageProps> = ({ title }) => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <ReadStory />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  await configUser(ctx, store)
  await configStory(ctx, store)
  // Create title for this page
  const { docs } = store.getState().stories
  const hasStory = docs.length > 0
  const title = `Storymash | ${hasStory ? docs[0].title : "Página no encontrada"}`

  return {
    props: { title },
  }
})

export default ReadStoryPage
