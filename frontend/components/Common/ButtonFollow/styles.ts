import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  button: {
    marginTop: 5,
    marginBottom: theme.spacing(2),
  },
  buttonUnfollow: {
    backgroundColor: theme.palette.red.main,
    color: theme.palette.red.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.red.dark,
    },
  },
}))
