import { useEffect, FC } from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import { wrapper } from "../store"
import theme from "../components/theme"
import NProgress from "nprogress"
import Router from "next/router"
import { AppProps } from "next/app"
import actions from "../store/actions"

/**
 * Nprogress config
 */
Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

const MyApp: FC<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp)
