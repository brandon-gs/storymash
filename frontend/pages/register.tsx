import { FormRegister, ProtectPage, Layout } from "../components"
import Head from "next/head"
import { NextPage } from "next"
import { wrapper } from "../store"
import { configUser } from "../services"

const RegisterPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Storymash | Crear cuenta</title>
      </Head>
      <ProtectPage type={"public"}>
        <FormRegister />
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

export default RegisterPage
