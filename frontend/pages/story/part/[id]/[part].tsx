// Types
import { NextPage } from "next"
// Components
import { FormStory, Layout, ProtectPage } from "../../../../components"
import Head from "next/head"
// Utils
import { configUser, configStory } from "../../../../services"
import { wrapper } from "../../../../store"

type Props = {
  story: Story
  part: StoryPart
}

const EditStoryPartPage: NextPage<Props> = ({ story, part }) => {
  return (
    <Layout>
      <Head>
        <title>Storybox | Editar {story.title}</title>
      </Head>
      <ProtectPage type={"both"}>
        <FormStory mode="edit" propStory={story} propStoryPart={part} />
      </ProtectPage>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  await configUser(ctx, store)
  await configStory(ctx, store)
  const indexPart = Number(ctx.params ? ctx.params.part : ctx.query.part)
  const story = store.getState().stories.docs[0]
  const part = story.parts[indexPart]
  return {
    props: {
      story,
      part,
    },
  }
})

export default EditStoryPartPage
