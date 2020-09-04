import {
  UPDATE_LOADER,
  UPDATE_ALERT,
  REMOVE_ALERT,
  AppState,
  AlertState,
  LoaderState,
  UPDATE_PROFILE,
  REMOVE_PROFILE,
} from "../types/app.types"
import { AnyAction } from "redux"
import { HYDRATE } from "next-redux-wrapper"

const initialLoader: LoaderState = {
  active: false,
}

const initialAlert: AlertState = {
  message: "",
  severity: "",
  open: false,
}

const initialState: AppState = {
  loader: initialLoader,
  alert: initialAlert,
  profile: null,
}

export default function appReducer(state = initialState, action: AnyAction): AppState {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.app }
    case UPDATE_LOADER:
      return { ...state, loader: { active: action.payload } }
    case UPDATE_ALERT:
      return {
        ...state,
        alert: action.payload.alert,
      }
    case UPDATE_PROFILE:
      return { ...state, profile: action.payload }
    case REMOVE_ALERT:
      return { ...state, alert: initialAlert }
    case REMOVE_PROFILE:
      return { ...state, profile: null }
    default:
      return state
  }
}
