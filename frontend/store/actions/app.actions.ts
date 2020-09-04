/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  UPDATE_LOADER,
  AlertState,
  UPDATE_ALERT,
  REMOVE_ALERT,
  UPDATE_PROFILE,
  REMOVE_PROFILE,
} from "../types/app.types"
import { AppThunk } from "../../next-env"
import { ThunkAction } from "redux-thunk"

export const updateLoader = (loader: boolean): AppThunk => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_LOADER, payload: loader })
  }
}

export const updateAlert = (alert: AlertState) => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_ALERT, payload: alert })
  }
}

export const updateProfile = (user: Express.User): any => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_PROFILE, payload: user })
  }
}

export const removeAlert = (): AppThunk => {
  return (dispatch: any) => {
    dispatch({ type: REMOVE_ALERT })
  }
}

export const removeProfile = () => {
  return (dispatch: any) => {
    dispatch({ type: REMOVE_PROFILE })
  }
}

export default {
  updateAlert,
  updateLoader,
  updateProfile,
  removeAlert,
  removeProfile,
}
