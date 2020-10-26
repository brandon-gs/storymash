import actions from "../store/actions"
import { GetServerSidePropsContext } from "next"
import { Store, AnyAction } from "redux"
import { RootState } from "../store"
import getNameServer from "../utils/getNameServer"
import Axios from "axios"

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
export default async function configStory(
  ctx: GetServerSidePropsContext & {
    store: Store<RootState, AnyAction>
  }
): Promise<any> {
  try {
    if (ctx.params) {
      const { id } = ctx.params
      const server = getNameServer(ctx)
      const { data } = await Axios.get(`${server}/api/story/${id}`)
      ctx.store.dispatch(actions.updateStories([data.story]))
    }
  } catch (error) {
    ctx.store.dispatch(actions.removeStories())
  }
}
