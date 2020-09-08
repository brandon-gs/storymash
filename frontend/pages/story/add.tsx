import { Layout, Head, FormStory } from "../../components"
import { NextPage } from "next"
import { wrapper } from "../../store"
import { configUser } from "../../getServerProps"

const AddStoryPage: NextPage = () => {
  return (
    <Layout>
      <Head title="Storymash | Crear historia"></Head>
      <FormStory mode="create" />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
})

export default AddStoryPage
