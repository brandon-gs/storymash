import { combineReducers } from "redux"
import authReducer from "./auth.reducer"

const rootReducer = combineReducers({
  authentication: authReducer,
})

export default rootReducer
