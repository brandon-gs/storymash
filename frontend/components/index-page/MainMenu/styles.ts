import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
  },
  tab: {
    color: theme.palette.grey.A100,
  },
  stickToBottom: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      backgroundColor: theme.palette.primary.main,
      top: "unset",
      bottom: 0,
      position: "fixed",
    },
  },
}))
