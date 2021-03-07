import Head from "next/head"
import { Layout, ProtectPage } from "components"
import { configUser } from "services"
import { wrapper } from "store"

export default function DashboardPage() {
  return (
    <Layout>
      <Head>
        <title>Storymash | Tablon</title>
      </Head>
      <ProtectPage type="private">
        <h1>Test</h1>
      </ProtectPage>
    </Layout>
  )
}
export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
})
