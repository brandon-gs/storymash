import { useEffect, FC } from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import { wrapper } from "../store"
import theme from "../components/theme"
import NProgress from "nprogress"
import Router from "next/router"
import { AppProps } from "next/app"
import { useDispatch } from "react-redux"
import actions from "store/actions"
import { MenuTabsRoutes } from "utils/tabs"

/**
 * Nprogress config
 */
Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

const MyApp: FC<AppProps> = (props: AppProps) => {
  const dispatch = useDispatch()
  const { Component, pageProps } = props

  const {
    router: { pathname },
  } = props

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    const indexTab = MenuTabsRoutes.hasOwnProperty(pathname) ? MenuTabsRoutes[pathname] : 5
    dispatch(actions.updateIndexTab(indexTab))
  }, [dispatch, pathname])

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
