import { Layout, Head, FormStoryPart } from "../../../../components"
import { wrapper } from "../../../../store"
import { NextPage } from "next"
import { configUser } from "../../../../getServerProps"

const AddStoryPartPage: NextPage = () => {
  return (
    <Layout>
      <Head title="Storymash | continuar historia" />
      <FormStoryPart />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
})

export default AddStoryPartPage
