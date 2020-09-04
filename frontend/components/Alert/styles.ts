import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  "& > * + *": {
    marginTop: theme.spacing(2),
  },
  root: {
    position: "fixed",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 1110,
  },
  alert: {
    height: 64,
    alignItems: "center",
  },
}))
