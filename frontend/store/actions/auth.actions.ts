/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosError } from "axios"
import Router from "next/router"
import { AUTHENTICATE, DEAUTHENTICATE, UPDATE_USER, REMOVE_USER } from "../types/auth.types"
import { setCookie, removeCookie } from "../../utils/cookie"
import actions from "."
import { publicRoutes } from "../../utils"

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
      // Get user info
      const {
        data: { token, user },
      } = await axios.post(`/api/auth/${type}`, formData)
      // Add token to axios headers
      axios.defaults.headers.common.authorization = token
      // Create cookie with token
      setCookie("token", token)
      // Save auth data in axios
      dispatch({ type: AUTHENTICATE, payload: { token, user } })
      // If user is in login or register page redirect to index
      if (ref === "/login" || ref === "/register") {
        await Router.push("/")
      }
    } catch (error) {
      const e = error as AxiosError
      const { response } = e
      if (response && response.status === 401) {
        const message = "Datos incorrectos, intente nuevamente."
        dispatch(actions.updateAlert({ message, severity: "error", open: true }))
      }
    } finally {
      dispatch(actions.updateLoader(false))
    }
  }
}

// gets the token from the cookie and saves it in the store
const reauthenticate = (token: string, user: User): any => {
  return (dispatch: any) => {
    // Add token to axios headers
    axios.defaults.headers.common.authorization = token
    // Save authenticated data in redux
    dispatch({ type: AUTHENTICATE, payload: { token, user } })
  }
}

// remove token
const deauthenticate = () => {
  return (dispatch: any) => {
    dispatch(actions.updateLoader(true))
    removeCookie("token")
    dispatch({ type: DEAUTHENTICATE })
    dispatch(actions.removeUser())
    // Remove token from axios headers
    axios.defaults.headers.common.authorization = null
    if (!publicRoutes.includes(Router.pathname)) {
      Router.push("/")
    }
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
