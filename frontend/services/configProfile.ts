import actions from "../store/actions"
import axios from "axios"
import getNameServer from "../utils/getNameServer"
import { GetServerSidePropsContext } from "next"
import { Store, AnyAction } from "redux"
import { RootState } from "../store"

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
export default async function configProfile(
  ctx: GetServerSidePropsContext,
  store: Store<RootState, AnyAction>
): Promise<any> {
  try {
    if (ctx.params) {
      const { username } = ctx.params
      const { authentication } = store.getState()
      if (authentication.user?.username === username) {
        store.dispatch(actions.updateProfile(authentication.user))
      } else {
        const server = getNameServer(ctx)
        const { data } = await axios.get(`${server}/api/user/profile/${username}`)
        if (data.user) {
          store.dispatch(actions.updateProfile(data.user))
        }
      }
    }
  } catch (error) {
    store.dispatch(actions.updateProfile(null))
  }
}
