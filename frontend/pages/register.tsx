import { Head, FormRegister, WithAuthRedirect, Layout } from "../components"
import { NextPage } from "next"
import { wrapper } from "../store"
import { configUser } from "../getServerProps"

const RegisterPage: NextPage = () => {
  return (
    <WithAuthRedirect location="/">
      <Layout>
        <Head title="Storymash | Registro"></Head>
        <FormRegister />
      </Layout>
    </WithAuthRedirect>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
})

export default RegisterPage
