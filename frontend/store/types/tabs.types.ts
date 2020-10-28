import { HydrateAction } from "../index"

export const UPDATE_ACTIVE_TAB = "UPDATE_ACTIVE_TAB"

export interface TabsState {
  indexTab: number
}

interface UpdateIndexTabAction {
  type: typeof UPDATE_ACTIVE_TAB
  payload: { indexTab: number }
}

export type TabsActionTypes = HydrateAction | UpdateIndexTabAction
