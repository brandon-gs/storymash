import { UPDATE_STORIES, StoriesState } from "../types/stories.types"

const updateStories = (stories: StoriesState): any => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_STORIES, stories })
  }
}

const removeStories = (): any => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_STORIES, stories: [] })
  }
}

export default {
  removeStories,
  updateStories,
}
