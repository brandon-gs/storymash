import { Head, Profile, Layout, ProfileStories } from "../../components"
import { NextPage } from "next"
import { wrapper } from "../../store"
import { configUser, configProfile, configStories } from "../../getServerProps"

type Props = {
  title: string
}

const ProfilePage: NextPage<Props> = ({ title }) => {
  return (
    <Layout>
      <Head title={title}></Head>
      <Profile />
      <ProfileStories />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
  await configProfile(ctx)
  await configStories(ctx)
  const { profile } = ctx.store.getState().app
  const title = profile ? `Storymash | ${profile.username}` : "Storymash"
  return {
    props: {
      title,
    },
  }
})

export default ProfilePage
