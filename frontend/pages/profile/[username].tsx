import { Head, Profile, Layout } from "../../components"
import { NextPage } from "next"
import { wrapper } from "../../store"
import { configUser } from "../../getServerProps"
import configProfile from "../../getServerProps/configProfile"

type Props = {
  title: string
}

const ProfilePage: NextPage<Props> = ({ title }) => {
  return (
    <Layout>
      <Head title={title}></Head>
      <Profile />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
  await configProfile(ctx)
  const { profile } = ctx.store.getState().app
  const title = profile ? `Storymash | ${profile.username}` : "Storymash"
  return {
    props: {
      title,
    },
  }
})

export default ProfilePage
