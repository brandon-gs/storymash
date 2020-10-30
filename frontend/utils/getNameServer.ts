import { GetServerSidePropsContext } from "next"
import { Store, AnyAction } from "redux"
import { RootState } from "../store"

export default function getNameServer(
  ctx: GetServerSidePropsContext & {
    store: Store<RootState, AnyAction>
  }
): string {
  const port = process.env.PORT || 3000
  return ctx.req ? `http://localhost:${port}` : ""
}
