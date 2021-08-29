import { createTheme } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    black: PaletteColor
    pink: PaletteColor
    red: PaletteColor
  }
  interface PaletteOptions {
    black: PaletteColorOptions
    pink: PaletteColorOptions
    red: PaletteColorOptions
  }
}
// Create a theme instance.
const theme = createTheme({
  palette: {
    black: {
      dark: "#20252e",
      main: "#2f3542",
      light: "#57606f",
    },
    pink: {
      light: "#f586e6",
      main: "#f368e0",
      dark: "#aa489c",
    },
    red: {
      dark: "#952122",
      main: "#d63031",
      light: "#de595a",
      contrastText: "#FFFFFF",
    },
    primary: {
      main: "#30336b",
    },
    secondary: {
      main: "#0984e3",
      contrastText: "#FFFFFF",
      // main: "#f9ca24",
      // dark: "#e4b306",
    },
    error: {
      main: "#a5383d",
      // main: red.A400,
    },
    warning: {
      main: "#ff9800",
    },
    success: {
      main: "#007d5c",
    },
    info: {
      main: "#00b894",
    },
    background: {
      default: "#f5f6fa",
    },
  },
})

export default theme
