// Types
import { NextPage } from "next"
// Components
import { Profile, Layout, ProfileStories, ProtectPage } from "../../components"
import Head from "next/head"
// ServerSideProps
import { configUser, configProfile, configUserStories } from "../../services"
// Helpers
import { wrapper } from "../../store"

type Props = {
  title: string
}

const ProfilePage: NextPage<Props> = ({ title }) => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <ProtectPage type={"both"}>
        <Profile />
        <ProfileStories />
      </ProtectPage>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
  await configProfile(ctx)
  await configUserStories(ctx)
  const { profile } = ctx.store.getState().app
  const title = profile ? `Storymash | ${profile.username}` : "Storymash"
  return {
    props: {
      title,
    },
  }
})

export default ProfilePage
