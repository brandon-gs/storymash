import { UPDATE_ACTIVE_TAB } from "../types/tabs.types"

const updateIndexTab = (indexTab: number) => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_ACTIVE_TAB, payload: { indexTab } })
  }
}

export default {
  updateIndexTab,
}
