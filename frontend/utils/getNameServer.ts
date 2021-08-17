import { GetServerSidePropsContext } from "next"

export default function getNameServer(ctx: GetServerSidePropsContext): string {
  const port = process.env.PORT || 3000
  return ctx.req ? `http://localhost:${port}` : ""
}
