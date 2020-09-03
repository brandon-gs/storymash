import Document, { Html, Head, Main, NextScript } from "next/document"
import theme from "../components/theme"
import { ServerStyleSheets } from "@material-ui/core"
import React from "react"

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="es">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="stylesheet" href="/css/nprogress.css" />
        </Head>
        <body>
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets()
  const originaRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originaRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)
  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement],
  }
}

export default MyDocument
