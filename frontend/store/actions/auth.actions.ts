/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios"
import Router from "next/router"
import { RegisterForm } from "../../components/FormRegister/types.register"
import { AUTHENTICATE, DEAUTHENTICATE, UPDATE_USER, REMOVE_USER } from "../types/auth.types"
import { setCookie, removeCookie } from "../../utils/cookie"
import actions from "."
import { User } from "../../next-env"
import { AnyAction } from "redux"

const updateUser = (user: Express.User) => {
  return (dispatch: any) => {
    dispatch({ type: UPDATE_USER, payload: user })
  }
}

const removeUser = () => {
  return (dispatch: any) => {
    dispatch({ type: REMOVE_USER })
  }
}

type LoginForm = {
  username: string
  password: string
  showPassword?: boolean
}

// gets token from the api and stores it in the redux store and in a cookie
const authenticate = (formData: RegisterForm | LoginForm, type: string): any => {
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
      Router.push("/")
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
    Router.push("/")
    dispatch({ type: DEAUTHENTICATE })
    dispatch(actions.removeUser())
    removeCookie("token")
    dispatch(actions.updateLoader(false))
  }
}

export default {
  authenticate,
  reauthenticate,
  deauthenticate,
  updateUser,
  removeUser,
}
