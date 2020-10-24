// Types
import { NextPage } from "next"
// Components
import { Layout, ReadStory } from "../../../components"
import Head from "next/head"
// ServerSideProps
import { configUser, configStory } from "../../../getServerProps"
// Helpers
import { wrapper } from "../../../store"

const ReadStoryPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Storymash | Crear historia</title>
      </Head>
      <ReadStory />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
  await configStory(ctx)
})

export default ReadStoryPage
