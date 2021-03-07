import { AnyAction } from "redux"
import { UPDATE_FAVORITE_STORIES, FavoriteStoriesState } from "../types/favorites.types"
import { HYDRATE } from "next-redux-wrapper"

const initialState: FavoriteStoriesState = []

export default function storiesReducer(
  state = initialState,
  action: AnyAction
): FavoriteStoriesState {
  switch (action.type) {
    case HYDRATE:
      return action.payload.favorites
    case UPDATE_FAVORITE_STORIES:
      return action.favorites
    default:
      return state
  }
}
