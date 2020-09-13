import { Layout, Head, ReadStory } from "../../../components"
import { NextPage } from "next"
import { wrapper } from "../../../store"
import { configUser, configStory } from "../../../getServerProps"

const ReadStoryPage: NextPage = () => {
  return (
    <Layout>
      <Head title="Storymash | Crear historia"></Head>
      <ReadStory />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
  await configStory(ctx)
})

export default ReadStoryPage
