import { createMuiTheme } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"
import { PaletteColor } from "@material-ui/core/styles/createPalette"

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    pink: PaletteColor
    red: PaletteColor
  }
  interface PaletteOptions {
    pink: PaletteColorOptions
    red: PaletteColorOptions
  }
}
// Create a theme instance.
const theme = createMuiTheme({
  palette: {
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
      main: "#f9ca24",
      dark: "#e4b306",
    },
    error: {
      main: red.A400,
    },
    warning: {
      main: "#ff9800",
    },
    success: {
      main: "#4caf50",
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
