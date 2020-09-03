import {
  AuthState,
  AUTHENTICATE,
  DEAUTHENTICATE,
  UPDATE_USER,
} from "../types/auth.types"
import { HYDRATE } from "next-redux-wrapper"
import { AnyAction } from "redux"

const initialState: AuthState = {
  token: null,
  user: null,
}

export default function authReducer(
  state = initialState,
  action: AnyAction
): AuthState {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.authentication }
    case AUTHENTICATE:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      }
    case DEAUTHENTICATE:
      return { ...state, token: null, user: null }
    case UPDATE_USER:
      return { ...state, user: action.payload.user }
    default:
      return state
  }
}
