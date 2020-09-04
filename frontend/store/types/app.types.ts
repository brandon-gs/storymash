import { User } from "../../next-env"

export const UPDATE_LOADER = "UPDATE_LOADER"
export const UPDATE_ALERT = "UPDATE_ALERT"
export const REMOVE_ALERT = "REMOVE_ALERT"
export const UPDATE_PROFILE = "UPDATE_PROFILE"
export const REMOVE_PROFILE = "REMOVE_PROFILE"

export type AlertState = {
  message: string
  severity: "success" | "info" | "warning" | "error"
  open: boolean
}

export type LoaderState = {
  active: boolean
}

export interface AppState {
  loader: LoaderState
  alert: AlertState
  profile: User | null
}
