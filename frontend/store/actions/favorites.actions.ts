import { UPDATE_FAVORITE_STORIES, FavoriteStoriesState } from "../types/favorites.types"
import axios from "axios"

const updateFavoriteStories = (favorites: FavoriteStoriesState): any => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_FAVORITE_STORIES, favorites })
  }
}

const asyncUpdateFavorites = (token: string | null): any => {
  return async (dispatch: any) => {
    if (token) {
      const {
        data: { favorites },
      } = await axios.get("/api/story/favorites", {
        headers: {
          authorization: token,
        },
      })
      dispatch({ type: UPDATE_FAVORITE_STORIES, favorites })
    }
  }
}

const removeFavoriteStories = (): any => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_FAVORITE_STORIES, favorites: [] })
  }
}

export default {
  removeFavoriteStories,
  updateFavoriteStories,
  asyncUpdateFavorites,
}
