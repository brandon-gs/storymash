/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import cookie from "js-cookie"

export const setCookie = (key: string, value: string): any => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1000,
      path: "/",
    })
  }
}

export const removeCookie = (key: string): any => {
  if (process.browser) {
    cookie.remove(key, {})
  }
}

export const getCookie = (key: string, req: any): string => {
  return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req)
}

export const getCookieFromBrowser = (key: string) => {
  return cookie.get(key)
}

const getCookieFromServer = (key: string, req: any) => {
  if (!req.headers.cookie) {
    return undefined
  }
  const rawCookie = req.headers.cookie
    .split(";")
    .find((c: string) => c.trim().startsWith(`${key}=`))
  if (!rawCookie) {
    return undefined
  }
  return rawCookie.split("=")[1]
}
