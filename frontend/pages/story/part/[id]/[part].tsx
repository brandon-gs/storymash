// Types
import { NextPage } from "next"
// Components
import { FormStory, Layout, ProtectPage } from "../../../../components"
import Head from "next/head"
// Utils
import { configUser, configStory } from "../../../../getServerProps"
import { wrapper } from "../../../../store"

type Props = {
  story: Story
  part: StoryPart
}

const EditStoryPartPage: NextPage<Props> = ({ story, part }) => {
  return (
    <Layout>
      <Head>
        <title>Storybox | Crear historia</title>
      </Head>
      <ProtectPage type={"both"}>
        <FormStory mode="edit" propStory={story} propStoryPart={part} />
      </ProtectPage>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  await configUser(ctx)
  await configStory(ctx)
  const indexPart = Number(ctx.params ? ctx.params.part : ctx.query.part)
  const story = ctx.store.getState().stories[0]
  const part = story.parts[indexPart]
  return {
    props: {
      story,
      part,
    },
  }
})

export default EditStoryPartPage
