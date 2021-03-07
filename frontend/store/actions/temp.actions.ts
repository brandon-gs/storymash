import { UPDATE_TEMP_STORY, TempStory } from "store/types/temp.types"
import Router from "next/router"

const updateTempStory = (formStory: TempStory): any => {
  return async (dispatch: any) => {
    dispatch({ type: UPDATE_TEMP_STORY, payload: { formStory } })
    await Router.push("/story/add")
  }
}

export default {
  updateTempStory,
}
