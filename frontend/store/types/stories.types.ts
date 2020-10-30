import { HydrateAction } from "../index"

export const UPDATE_STORIES = "UPDATE_STORIES"
export const UPDATE_DATA_STORIES = "UPDATE_DATA_STORIES"
export const ASYNC_UPDATE_DATA_STORIES = "ASYNC_UPDATE_DATA_STORIES"

export interface StoriesState {
  docs: Array<Story>
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

interface AsyncUpdateDataStoriesAction {
  type: typeof ASYNC_UPDATE_DATA_STORIES
  payload: { data: StoriesState }
}

interface UpdateDataStoriesAction {
  type: typeof UPDATE_DATA_STORIES
  payload: { data: StoriesState }
}

interface UpdateStoriesAction {
  type: typeof UPDATE_STORIES
  payload: { docs: Array<Story> }
}
export type StoriesActionTypes =
  | HydrateAction
  | AsyncUpdateDataStoriesAction
  | UpdateStoriesAction
  | UpdateDataStoriesAction
