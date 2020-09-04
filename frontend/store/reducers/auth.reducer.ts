import {
  AuthState,
  AUTHENTICATE,
  DEAUTHENTICATE,
  UPDATE_USER,
  REMOVE_USER,
} from "../types/auth.types"
import { HYDRATE } from "next-redux-wrapper"
import { AnyAction } from "redux"

const initialState: AuthState = {
  token: null,
  user: null,
  auth: false,
}

export default function authReducer(state = initialState, action: AnyAction): AuthState {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.authentication }
    case AUTHENTICATE:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        auth: true,
      }
    case DEAUTHENTICATE:
      return { ...state, token: null, user: null, auth: false }
    case UPDATE_USER:
      return { ...state, user: action.payload, auth: true }
    case REMOVE_USER:
      return { ...state, user: null, auth: false }
    default:
      return state
  }
}
