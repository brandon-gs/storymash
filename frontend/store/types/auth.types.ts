export const AUTHENTICATE = "AUTHENTICATE"
export const DEAUTHENTICATE = "DEAUTHENTICATE"
export const UPDATE_USER = "UPDATE_USER"

export interface AuthState {
  token: string | null
  user: Express.User | null
}

export interface AuthenticateAction {
  type: typeof AUTHENTICATE
  payload: AuthState
}

export interface DeauthenticateAction {
  type: typeof DEAUTHENTICATE
}
