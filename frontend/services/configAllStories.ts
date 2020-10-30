import actions from "../store/actions"
import { GetServerSidePropsContext } from "next"
import { Store, AnyAction } from "redux"
import { RootState } from "../store"
import getNameServer from "../utils/getNameServer"
import Axios from "axios"

export default async function configUserStories(
  ctx: GetServerSidePropsContext & {
    store: Store<RootState, AnyAction>
  }
): Promise<any> {
  try {
    const server = getNameServer(ctx)
    const limitStories = ctx.store.getState().stories.limit
    const { data } = await Axios.get(`${server}/api/story/?limit=${limitStories}`)
    ctx.store.dispatch(actions.updateDataStories(data))
  } catch (error) {
    ctx.store.dispatch(actions.removeStories())
  }
}
