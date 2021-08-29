import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { createStore, applyMiddleware, Middleware, Store, AnyAction } from "redux"
import rootReducer from "./reducers"
import { createWrapper, HYDRATE } from "next-redux-wrapper"
import { AuthState } from "./types/auth.types"
import { AppState } from "./types/app.types"
import { StoriesState } from "./types/stories.types"
import { FavoriteStoriesState } from "./types/favorites.types"
import { TabsState } from "./types/tabs.types"
import { TempState } from "./types/temp.types"

export interface RootState {
  authentication: AuthState
  app: AppState
  stories: StoriesState
  favorites: FavoriteStoriesState
  tabs: TabsState
  temp: TempState
}

// Redux types
export type HydrateAction = {
  type: typeof HYDRATE
  payload: RootState
}

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}

const bindMiddleware = (middleware: Array<Middleware>) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export const makeStore = () => createStore(rootReducer, bindMiddleware([thunk]))

export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true })
