// Types
import { NextPage } from "next"
// Components
import { Layout, FormStoryPart } from "../../../../components"
import Head from "next/head"
// ServerSideProps
import { configUser } from "../../../../services"
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

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  await configUser(ctx, store)
  return {
    props: {},
  }
})

export default AddStoryPartPage
