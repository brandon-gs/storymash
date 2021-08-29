import { combineReducers } from "redux"
import authReducer from "./auth.reducer"
import appReducer from "./app.reducer"
import storiesReducer from "./stories.reducer"
import favoritesReducer from "./favorites.reducer"
import tabsReducer from "./tabs.reducer"
import tempReducer from "./temp.reducer"

const rootReducer = combineReducers({
  authentication: authReducer,
  app: appReducer,
  stories: storiesReducer,
  favorites: favoritesReducer,
  tabs: tabsReducer,
  temp: tempReducer,
})

export default rootReducer
