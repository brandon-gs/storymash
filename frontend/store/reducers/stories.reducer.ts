import {
  UPDATE_STORIES,
  UPDATE_DATA_STORIES,
  ASYNC_UPDATE_DATA_STORIES,
  StoriesActionTypes,
  StoriesState,
} from "../types/stories.types"
import { HYDRATE } from "next-redux-wrapper"

const initialState: StoriesState = {
  docs: [],
  totalDocs: 0,
  offset: 0,
  limit: 9,
  totalPages: 0,
  page: 1,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: 1,
}

export default function storiesReducer(
  state = initialState,
  action: StoriesActionTypes
): StoriesState {
  switch (action.type) {
    case HYDRATE:
      return action.payload.stories
    case UPDATE_STORIES:
      return { ...state, docs: action.payload.docs }
    case UPDATE_DATA_STORIES:
      return action.payload.data
    case ASYNC_UPDATE_DATA_STORIES:
      return action.payload.data
    default:
      return state
  }
}
