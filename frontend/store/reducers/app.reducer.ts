import {
  UPDATE_LOADER,
  UPDATE_ALERT,
  REMOVE_ALERT,
  AppState,
  AlertState,
  LoaderState,
  UPDATE_PROFILE,
  REMOVE_PROFILE,
  AppActionTypes,
} from "../types/app.types"
import { HYDRATE } from "next-redux-wrapper"

const initialLoader: LoaderState = {
  active: false,
}

const initialAlert: AlertState = {
  message: "",
  severity: "success",
  open: false,
}

const initialState: AppState = {
  loader: initialLoader,
  alert: initialAlert,
  profile: null,
}

export default function appReducer(state = initialState, action: AppActionTypes): AppState {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.app }
    case UPDATE_LOADER:
      return { ...state, loader: { active: action.payload } }
    case UPDATE_ALERT:
      return {
        ...state,
        alert: { ...action.payload, open: true },
      }
    case UPDATE_PROFILE:
      return { ...state, profile: action.payload }
    case REMOVE_ALERT:
      return { ...state, alert: { ...state.alert, open: false } }
    case REMOVE_PROFILE:
      return { ...state, profile: null }
    default:
      return state
  }
}
