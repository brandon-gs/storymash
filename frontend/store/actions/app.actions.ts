/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  UPDATE_LOADER,
  AlertState,
  UPDATE_ALERT,
  REMOVE_ALERT,
  UPDATE_PROFILE,
  REMOVE_PROFILE,
} from "../types/app.types"
import axios from "axios"
import actions from "."
import { UPDATE_USER } from "store/types/auth.types"

export const updateLoader = (loader: boolean): AppThunk => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_LOADER, payload: loader })
  }
}

export const updateAlert = (alert: AlertState) => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_ALERT, payload: alert })
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT })
    }, 5000)
  }
}

// Update only on redux
export const updateProfile = (user: User | null): any => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_PROFILE, payload: user })
  }
}

// Update on redux and database
export const asyncUpdateProfile = (username: string, dataToUpdate: any, token: string | null) => {
  return async (dispatch: any) => {
    if (token) {
      const secret = process.env.API_SECRET
      const { data } = await axios.put(`/api/user/profile/${username}`, dataToUpdate, {
        headers: {
          "api-authorization": secret,
          authorization: token,
        },
      })
      if (data.user) {
        dispatch({ type: UPDATE_PROFILE, payload: data.user })
      }
    }
  }
}

// Update on redux and database
export const followUser = (
  action: "follow" | "unfollow",
  username: string,
  token: string | null
) => {
  return async (dispatch: any) => {
    try {
      if (token) {
        const secret = process.env.API_SECRET
        const { data } = await axios.put(
          `/api/user/${action}/${username}`,
          {},
          {
            headers: {
              "api-authorization": secret,
            },
          }
        )
        if (data.profile) {
          dispatch({ type: UPDATE_PROFILE, payload: data.profile })
        }
        dispatch({ type: UPDATE_USER, payload: data.user })
      }
    } catch (e) {
      const followMessage = action === "follow" ? "seguir" : "dejar de seguir"
      const alert: AlertState = {
        message: `Error al ${followMessage} a este usuario, intentalo más tarde`,
        severity: "error",
        open: true,
      }
      dispatch(actions.updateAlert(alert))
    }
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

export const updatePhotoProfile = (file: any, token: string | null) => {
  return async (dispatch: any) => {
    dispatch(actions.updateLoader(true))
    if (token) {
      try {
        const formData = new FormData()
        formData.append("image", file)
        const { data } = await axios.post("/api/user", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: token,
          },
        })
        dispatch(actions.updateUser(data.user))
        dispatch(actions.updateProfile(data.user))
        dispatch(
          actions.updateAlert({
            message: "Imagen actualizada correctamente",
            severity: "success",
            open: true,
          })
        )
      } catch (error) {
        const alert: AlertState = {
          message: "Error al subir la imagen",
          severity: "error",
          open: true,
        }
        dispatch(actions.updateAlert(alert))
      }
    }
    dispatch(actions.updateLoader(false))
  }
}

export default {
  updateAlert,
  updateLoader,
  updateProfile,
  removeAlert,
  removeProfile,
  updatePhotoProfile,
  asyncUpdateProfile,
  followUser,
}
