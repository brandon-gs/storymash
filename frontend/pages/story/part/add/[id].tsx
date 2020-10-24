// Types
import { NextPage } from "next"
// Components
import { Layout, FormStoryPart } from "../../../../components"
import Head from "next/head"
// ServerSideProps
import { configUser } from "../../../../getServerProps"
// Helpers
import { wrapper } from "../../../../store"

const AddStoryPartPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Storymash | Continuar historia</title>
      </Head>
      <FormStoryPart />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
})

export default AddStoryPartPage
