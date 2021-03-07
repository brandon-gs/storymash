import { HydrateAction } from "../index"

export const UPDATE_TEMP_STORY = "UPDATE_TEMP_STORY"

export interface TempStory {
  story: {
    title: string
  }
  storyPart: {
    content: string
  }
}

export interface TempState {
  formStory: TempStory
}

interface UpdateTempStory {
  type: typeof UPDATE_TEMP_STORY
  payload: { formStory: TempStory }
}

export type TempActionTypes = HydrateAction | UpdateTempStory
