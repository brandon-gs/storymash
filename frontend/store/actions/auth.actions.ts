/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios"
import Router from "next/router"
import { AUTHENTICATE, DEAUTHENTICATE, UPDATE_USER, REMOVE_USER } from "../types/auth.types"
import { setCookie, removeCookie } from "../../utils/cookie"
import actions from "."

// Update the user without request
const updateUser = (user: User) => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_USER, payload: user })
  }
}

// Update the user with request to backend
const asyncUpdateUser = (token: string | null, body: any) => {
  return async (dispatch: any) => {
    if (token) {
      const { data } = await axios.put("/api/user", body, {
        headers: {
          authorization: token,
        },
      })
      if (data.user) {
        dispatch({ type: UPDATE_USER, payload: data.user })
      }
    }
  }
}

const removeUser = () => {
  return (dispatch: any) => {
    dispatch({ type: REMOVE_USER })
  }
}

// gets token from the api and stores it in the redux store and in a cookie
const authenticate = (formData: RegisterForm | LoginForm, type: string, ref: string): any => {
  if (type !== "login" && type !== "register") {
    throw new Error("Wront API call!")
  }
  return async (dispatch: any) => {
    dispatch(actions.updateLoader(true))
    try {
      const {
        data: { token },
      } = await axios.post(`/api/auth/${type}`, formData)
      const {
        data: { user },
      } = await axios.get("/api/user", {
        headers: {
          authorization: token,
        },
      })
      setCookie("token", token)
      dispatch({ type: AUTHENTICATE, payload: { token, user } })
      dispatch(actions.removeAlert())
      if (ref === "/login" || ref === "/register") {
        Router.push("/")
      }
      dispatch(actions.updateLoader(false))
    } catch (e) {
      const { response } = e
      if (response.status === 401) {
        const message = "Datos incorrectos, intente nuevamente."
        dispatch(actions.updateAlert({ message, severity: "error", open: true }))
      }
      dispatch(actions.updateLoader(false))
    }
  }
}

// gets the token from the cookie and saves it in the store
const reauthenticate = (token: string, user: User): any => {
  return (dispatch: any) => {
    dispatch({ type: AUTHENTICATE, payload: { token, user } })
  }
}

// removing the token
const deauthenticate = () => {
  return (dispatch: any) => {
    dispatch(actions.updateLoader(true))
    dispatch({ type: DEAUTHENTICATE })
    dispatch(actions.removeUser())
    removeCookie("token")
    Router.push("/")
    dispatch(actions.updateLoader(false))
  }
}

export default {
  authenticate,
  reauthenticate,
  deauthenticate,
  updateUser,
  asyncUpdateUser,
  removeUser,
}
