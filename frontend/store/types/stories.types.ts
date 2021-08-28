import { HydrateAction } from "../index"

export const UPDATE_STORIES = "UPDATE_STORIES"
export const UPDATE_DATA_STORIES = "UPDATE_DATA_STORIES"
export const ASYNC_UPDATE_DATA_STORIES = "ASYNC_UPDATE_DATA_STORIES"
export const ADD_COMMENT_TO_STORY = "ADD_COMMENT_TO_STORY"
export const UPDATE_COMMENT = "UPDATE_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"

export interface StoriesState {
  docs: Story[]
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

interface AddCommentStoriesAction {
  type: typeof ADD_COMMENT_TO_STORY
  payload: { indexPart: number; comment: StoryPartComment }
}

interface UpdateCommentAction {
  type: typeof UPDATE_COMMENT
  payload: { indexPart: number; comment: StoryPartComment }
}

interface DeleteCommentAction {
  type: typeof DELETE_COMMENT
  payload: { indexPart: number; idComment: string }
}

export type StoriesActionTypes =
  | HydrateAction
  | AsyncUpdateDataStoriesAction
  | UpdateStoriesAction
  | UpdateDataStoriesAction
  | AddCommentStoriesAction
  | UpdateCommentAction
  | DeleteCommentAction
