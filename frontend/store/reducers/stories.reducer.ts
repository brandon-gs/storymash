import { AnyAction } from "redux"
import { UPDATE_STORIES, StoriesState } from "../types/stories.types"
import { HYDRATE } from "next-redux-wrapper"

const initialState: Array<Story> = []

export default function storiesReducer(state = initialState, action: AnyAction): StoriesState {
  switch (action.type) {
    case HYDRATE:
      return action.payload.stories
    case UPDATE_STORIES:
      return action.stories
    default:
      return state
  }
}
