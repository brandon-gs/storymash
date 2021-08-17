import actions from "../store/actions"
import { GetServerSidePropsContext } from "next"
import { Store, AnyAction } from "redux"
import { RootState } from "../store"
import getNameServer from "../utils/getNameServer"
import Axios from "axios"

// checks if the page is being loaded on the server, and if so, get a story
export default async function configStory(
  ctx: GetServerSidePropsContext,
  store: Store<RootState, AnyAction>
): Promise<any> {
  try {
    if (ctx.params) {
      const { id } = ctx.params
      const server = getNameServer(ctx)
      const response = await Axios.get(`${server}/api/story/${id}`)
      const storiesDocs = response.data.story ? [response.data.story] : []
      console.log("Test")
      console.log("data: ", response)
      console.log("storiesDocs", storiesDocs)
      store.dispatch(actions.updateStories(storiesDocs))
    }
  } catch (error) {
    store.dispatch(actions.removeStories())
  }
}
