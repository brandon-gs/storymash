// Types
import { NextPage } from "next"
// Components
import { Layout, FormStory } from "../../components"
import Head from "next/head"
// ServerSideProps
import { configUser } from "../../getServerProps"
// Helpers
import { wrapper } from "../../store"

const AddStoryPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Storymash | Crear historia</title>
      </Head>
      <FormStory mode="create" />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
})

export default AddStoryPage
