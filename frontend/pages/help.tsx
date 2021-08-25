// Types
import { NextPage } from "next"
// Components
import { ProtectPage, Layout, Questions } from "components/"
import Head from "next/head"
// ServerSideProps
import { configUser } from "../services"
// Helpers
import { wrapper } from "../store"

const HelpPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Storymash | Ayuda</title>
      </Head>
      <ProtectPage type={"both"}>
        <Questions />
      </ProtectPage>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  await configUser(ctx, store)
  return {
    props: {},
  }
})

export default HelpPage
