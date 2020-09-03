import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { createStore, applyMiddleware, Middleware } from "redux"
import rootReducer from "./reducers"
import { createWrapper, MakeStore } from "next-redux-wrapper"
import { AuthState } from "./types/auth.types"

export interface RootState {
  authentication: AuthState
}

const bindMiddleware = (middleware: Array<Middleware>) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const makeStore: MakeStore<RootState> = () => createStore(rootReducer, bindMiddleware([thunk]))

export const wrapper = createWrapper<RootState>(makeStore, { debug: false })
