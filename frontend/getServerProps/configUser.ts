import actions from "../store/actions"
import getToken from "./helpers/getToken"
import axios from "axios"
import getNameServer from "../utils/getNameServer"
import { GetServerSidePropsContext } from "next"
import { Store, AnyAction } from "redux"
import { RootState } from "../store"
import { publicRoutes } from "../utils"

// if the page is being loaded in the server, get auth token from the cookie, and update user state on redux:
export default async function configUser(
  ctx: GetServerSidePropsContext & {
    store: Store<RootState, AnyAction>
  }
): Promise<any> {
  const token = getToken(ctx)
  if (token) {
    const server = getNameServer(ctx)
    const { data } = await axios.get(`${server}/api/user`, {
      headers: {
        authorization: token,
      },
    })
    if (data.user) {
      ctx.store.dispatch(actions.reauthenticate(token, data.user))
      const { url } = ctx.req
      if (url && publicRoutes.includes(url) && url !== "/") {
        ctx.res.writeHead(302, { Location: "/" }).end()
      }
    }
  }
}
