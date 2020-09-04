import { User } from "../../next-env"

export const AUTHENTICATE = "AUTHENTICATE"
export const DEAUTHENTICATE = "DEAUTHENTICATE"
export const UPDATE_USER = "UPDATE_USER"
export const REMOVE_USER = "REMOVE_USER"

export interface AuthState {
  token: string | null
  user: Express.User | null
  auth?: boolean
}

export interface AuthenticateAction {
  type: typeof AUTHENTICATE
  payload: AuthState
}

export interface DeauthenticateAction {
  type: typeof DEAUTHENTICATE
}

export interface UpdateUserAction {
  type: typeof UPDATE_USER
  payload: User | null
}

export interface RemoveUserAction {
  type: typeof REMOVE_USER
}

export type AuthActions = AuthenticateAction | DeauthenticateAction
