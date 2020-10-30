import { HydrateAction } from "../index"

export const UPDATE_LOADER = "UPDATE_LOADER"
export const UPDATE_ALERT = "UPDATE_ALERT"
export const REMOVE_ALERT = "REMOVE_ALERT"
export const UPDATE_PROFILE = "UPDATE_PROFILE"
export const REMOVE_PROFILE = "REMOVE_PROFILE"

// States
export type SeverityTypes = "success" | "info" | "warning" | "error"

export type AlertState = {
  message: string
  severity: SeverityTypes
  open?: boolean
}

export type LoaderState = {
  active: boolean
}

export type ProfileState = User | null

export interface AppState {
  loader: LoaderState
  alert: AlertState
  profile: ProfileState
}

// Actions

interface UpdateLoaderAction {
  type: typeof UPDATE_LOADER
  payload: boolean
}

interface UpdateAlertAction {
  type: typeof UPDATE_ALERT
  payload: { message: string; severity: SeverityTypes }
}

interface RemoveAlertAction {
  type: typeof REMOVE_ALERT
}

interface UpdateProfileAction {
  type: typeof UPDATE_PROFILE
  payload: ProfileState
}

interface RemoveProfileAction {
  type: typeof REMOVE_PROFILE
}

export type AppActionTypes =
  | HydrateAction
  | UpdateAlertAction
  | UpdateLoaderAction
  | RemoveAlertAction
  | UpdateProfileAction
  | RemoveProfileAction
