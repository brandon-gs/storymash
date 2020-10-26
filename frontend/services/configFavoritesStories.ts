import actions from "../store/actions"
import { GetServerSidePropsContext } from "next"
import { Store, AnyAction } from "redux"
import { RootState } from "../store"
import getNameServer from "../utils/getNameServer"
import Axios from "axios"
import getToken from "./helpers/getToken"

export default async function configFavoritesStories(
  ctx: GetServerSidePropsContext & {
    store: Store<RootState, AnyAction>
  }
): Promise<any> {
  try {
    const server = getNameServer(ctx)
    const token = getToken(ctx)
    const { data } = await Axios.get(`${server}/api/story/favorites`, {
      headers: {
        authorization: token,
      },
    })
    const favorites = data.favorites ? data.favorites.reverse() : []
    ctx.store.dispatch(actions.updateFavoriteStories(favorites))
  } catch (error) {
    ctx.store.dispatch(actions.removeFavoriteStories())
  }
}
