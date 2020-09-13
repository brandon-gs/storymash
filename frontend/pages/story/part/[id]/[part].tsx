// Components
import { Head, FormStory, Layout } from "../../../../components"
// Utils
import { NextPage } from "next"
import { configUser, configStory } from "../../../../getServerProps"
import { wrapper } from "../../../../store"

type Props = {
  story: Story
  part: StoryPart
}

const EditStoryPartPage: NextPage<Props> = ({ story, part }) => {
  return (
    <Layout>
      <Head title="Storybox | Crear historia" />
      <FormStory mode="edit" propStory={story} propStoryPart={part} />
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
