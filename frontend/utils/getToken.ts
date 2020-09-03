import { getCookie } from "../utils/cookie"
import { NextPageContext } from "next"

export default function getToken(ctx: NextPageContext): string {
  return ctx.req ? getCookie("token", ctx.req) : ctx.store.getState().authentication.token
}
