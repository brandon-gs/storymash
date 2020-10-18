import { combineReducers } from "redux"
import authReducer from "./auth.reducer"
import appReducer from "./app.reducer"
import storiesReducer from "./stories.reducer"
import favoritesReducer from "./favorites.reducer"

const rootReducer = combineReducers({
  authentication: authReducer,
  app: appReducer,
  stories: storiesReducer,
  favorites: favoritesReducer,
})

export default rootReducer
