import { WithAuthRedirect, Head, Layout, Login } from "../components"
import { NextPage } from "next"
import { wrapper } from "../store"
import { configUser } from "../getServerProps"

const LoginPage: NextPage = () => {
  return (
    <WithAuthRedirect location="/">
      <Layout>
        <Head title="Storymash | Iniciar sesión"></Head>
        <Login />
      </Layout>
    </WithAuthRedirect>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
})

export default LoginPage
