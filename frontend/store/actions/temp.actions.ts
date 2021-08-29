import { UPDATE_TEMP_STORY, TempStory } from "store/types/temp.types"
import Router from "next/router"

const updateTempStory = (formStory: TempStory): any => {
  return async (dispatch: any) => {
    await Router.push("/story/add")
    dispatch({ type: UPDATE_TEMP_STORY, payload: { formStory } })
  }
}

export default {
  updateTempStory,
}
