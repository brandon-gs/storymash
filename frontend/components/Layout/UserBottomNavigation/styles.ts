import { makeStyles } from "@material-ui/core"

export default makeStyles(theme => ({
  root: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      width: "100%",
      backgroundColor: theme.palette.primary.main,
      bottom: 0,
      position: "fixed",
    },
  },
  item: {
    color: `${theme.palette.grey["600"]} !important`,
  },
  itemActive: {
    color: `${theme.palette.primary.contrastText} !important`,
  },
}))
