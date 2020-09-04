import { combineReducers } from "redux"
import authReducer from "./auth.reducer"
import appReducer from "./app.reducer"

const rootReducer = combineReducers({
  authentication: authReducer,
  app: appReducer,
})

export default rootReducer
