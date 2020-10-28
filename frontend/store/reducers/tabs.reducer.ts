import { UPDATE_ACTIVE_TAB, TabsActionTypes, TabsState } from "../types/tabs.types"
import { HYDRATE } from "next-redux-wrapper"

const initialState: TabsState = {
  indexTab: 0,
}

export default function storiesReducer(state = initialState, action: TabsActionTypes): TabsState {
  switch (action.type) {
    case HYDRATE:
      return action.payload.tabs
    case UPDATE_ACTIVE_TAB:
      return { ...state, indexTab: action.payload.indexTab }
    default:
      return state
  }
}
