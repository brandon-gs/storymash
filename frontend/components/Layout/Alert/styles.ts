import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  "& > * + *": {
    marginTop: theme.spacing(2),
  },
  root: {
    position: "fixed",
    width: "100%",
    top: "calc(100% - 64px)",
    left: 0,
    zIndex: theme.zIndex.drawer + 10000,
  },
  alert: {
    height: 64,
    alignItems: "center",
  },
}))
