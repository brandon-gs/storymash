import { createMuiTheme } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0984e3",
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
      default: "#fff",
    },
  },
})

export default theme
