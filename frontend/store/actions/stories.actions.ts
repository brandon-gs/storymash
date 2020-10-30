import axios from "axios"
import {
  ASYNC_UPDATE_DATA_STORIES,
  UPDATE_STORIES,
  UPDATE_DATA_STORIES,
  StoriesState,
} from "../types/stories.types"
import Router from "next/router"

const updateStories = (docs: Array<Story>): any => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_STORIES, payload: { docs } })
  }
}

const updateDataStories = (dataStories: StoriesState): any => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_DATA_STORIES, payload: { data: dataStories } })
  }
}

const asyncUpdateDataStories = (prevDataStories: StoriesState, limit = 0, page = 0) => {
  return async (dispatch: any) => {
    const currentPage = page > 0 ? page : prevDataStories.page
    const currentLimit = limit > 0 ? limit : prevDataStories.limit
    const { pathname, query } = Router
    let data = prevDataStories
    if (pathname === "/") {
      // If pathname is home, call to all stories endpoint
      data = (
        await axios.get(
          `/api/story/?limit=${currentLimit}&page=${currentPage}&offset=${
            currentPage * currentLimit
          }`
        )
      ).data
    } else {
      // If pathname is profile/[username], call to stories by username endpoint
      try {
        data = (
          await axios.get(
            `/api/story/user/${query.username}?limit=${currentLimit}&page=${currentPage}&offset=${
              currentPage * currentLimit
            }`
          )
        ).data
      } catch (e) {
        console.log(e)
      }
    }
    data.docs = [...prevDataStories.docs, ...data.docs]
    dispatch({ type: ASYNC_UPDATE_DATA_STORIES, payload: { data } })
  }
}

const removeStories = (): any => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_STORIES, payload: { stories: [] } })
  }
}

export default {
  updateStories,
  updateDataStories,
  asyncUpdateDataStories,
  removeStories,
}
