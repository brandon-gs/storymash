import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  cursorPointer: {
    cursor: "pointer",
  },
  disabledIcon: {
    color: theme.palette.black.main,
  },
  liked: {
    color: theme.palette.pink.light,
  },
}))
