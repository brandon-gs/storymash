import { TempActionTypes, UPDATE_TEMP_STORY, TempState } from "../types/temp.types"
import { HYDRATE } from "next-redux-wrapper"

const initialState: TempState = {
  formStory: {
    story: {
      title: "",
    },
    storyPart: {
      content: "",
    },
  },
}

export default function storiesReducer(state = initialState, action: TempActionTypes): TempState {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.temp }
    case UPDATE_TEMP_STORY:
      return { ...state, formStory: action.payload.formStory }
    default:
      return state
  }
}
