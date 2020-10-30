// Types
import { NextPage } from "next"
// Components
import { ProtectPage, Layout, Login } from "../components"
import Head from "next/head"
// ServerSideProps
import { configUser } from "../services"
// Helpers
import { wrapper } from "../store"

const LoginPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Storymash | Iniciar sesión</title>
      </Head>
      <ProtectPage type={"public"}>
        <Login />
      </ProtectPage>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
})

export default LoginPage
