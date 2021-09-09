import { GetServerSidePropsContext } from "next"
import getNameServer from "../utils/getNameServer"
import Axios from "axios"

// checks if the page is being loaded on the server, and if so, get a story
export default async function configStoriesBySearch(ctx: GetServerSidePropsContext): Promise<any> {
  try {
    if (ctx.query.search) {
      const { search } = ctx.query
      const server = getNameServer(ctx)
      const response = await Axios.get(`${server}/api/story/search/${search}`)
      return response.data.stories
    }
    return null
  } catch (error) {
    return null
  }
}
