import actions from "../store/actions"
import { GetServerSidePropsContext } from "next"
import { Store, AnyAction } from "redux"
import { RootState } from "../store"
import getNameServer from "../utils/getNameServer"
import Axios from "axios"

export default async function configRankStories(
  ctx: GetServerSidePropsContext,
  store: Store<RootState, AnyAction>
): Promise<any> {
  try {
    const server = getNameServer(ctx)
    const limitStories = store.getState().stories.limit
    const { data } = await Axios.get(`${server}/api/story/rank?limit=${limitStories}`)
    store.dispatch(actions.updateDataStories(data))
  } catch (error) {
    store.dispatch(actions.removeStories())
  }
}
