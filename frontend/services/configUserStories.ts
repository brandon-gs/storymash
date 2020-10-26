import actions from "../store/actions"
import { GetServerSidePropsContext } from "next"
import { Store, AnyAction } from "redux"
import { RootState } from "../store"
import getNameServer from "../utils/getNameServer"
import Axios from "axios"

export default async function configStories(
  ctx: GetServerSidePropsContext & {
    store: Store<RootState, AnyAction>
  }
): Promise<any> {
  try {
    if (ctx.params) {
      const { username } = ctx.params
      const server = getNameServer(ctx)
      const { data } = await Axios.get(`${server}/api/story/user/${username}`)
      ctx.store.dispatch(actions.updateStories(data.stories))
    }
  } catch (error) {
    ctx.store.dispatch(actions.removeStories())
  }
}
