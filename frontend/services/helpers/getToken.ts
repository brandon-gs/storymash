import { getCookie } from "../../utils/cookie"
import { GetServerSidePropsContext } from "next"
import { Store, AnyAction } from "redux"
import { RootState } from "../../store"

export default function getToken(
  ctx: GetServerSidePropsContext,
  store: Store<RootState, AnyAction>
): string | null {
  return ctx.req ? getCookie("token", ctx.req) : store.getState().authentication.token
}
