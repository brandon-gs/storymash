import { GetServerSidePropsContext } from "next"
import { Store, AnyAction } from "redux"
import { RootState } from "../store"

export default function getNameServer(
  ctx: GetServerSidePropsContext & {
    store: Store<RootState, AnyAction>
  }
): string {
  return ctx.req ? "http://localhost:3000" : ""
}
