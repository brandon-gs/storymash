import { AnyAction, Store } from "redux"
import { GetServerSidePropsContext } from "next"
import getNameServer from "../utils/getNameServer"
import Axios from "axios"
import { RootState } from "store"

// checks if the page is being loaded on the server, and if so, get a story
export default async function configStoriesPlank(
  ctx: GetServerSidePropsContext,
  store: Store<RootState, AnyAction>
): Promise<any> {
  try {
    const server = getNameServer(ctx)
    const response = await Axios.get(`${server}/api/story/plank`, {
      headers: {
        authorization: store.getState().authentication.token,
      },
    })
    return response.data.stories
  } catch (error) {
    return []
  }
}
