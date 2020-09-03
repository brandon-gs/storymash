import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    color: "#FFF",
    textDecoration: "none",
  },
  containerLogo: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}))
