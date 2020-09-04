import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import { wrapper } from "../store"
import theme from "../components/theme"
import NProgress from "nprogress"
import Router from "next/router"
import { AppProps, AppContext, AppInitialProps } from "next/app"
import { useEffect, FC } from "react"
import actions from "../store/actions"

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

export async function getServerSideProps({ Component, ctx }: AppContext): Promise<AppInitialProps> {
  ctx.store.dispatch(actions.removeAlert())
  return {
    pageProps: {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    },
  }
}

export default wrapper.withRedux(MyApp)
